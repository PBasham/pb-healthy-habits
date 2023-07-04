import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Button, Modal, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TextInput, TextInputEndEditingEventData, TextInputFocusEventData, View } from "react-native";
import styled from "styled-components/native";

import DateTimePicker from '@react-native-community/datetimepicker';

import * as logHelpers from "../../../utilities/moodLog-helpers"
// components --------------------------------------------------
import { Container } from "../../shared";
import { HeaderOne, HeaderTwo, HeaderThree, BodyText, SubText } from "../../ui/text";

// misc --------------------------------------------------
// colors
import { generalColors, textColors } from "../../../assets";
import { StandardButton, TopBar } from "../../../components/ui";
import { ContainerFlexTwo, ScreenWidth } from "../../../components/shared/shared";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmotionDetail, LoggedEmotion } from "../../../interfaces";
import { EmotionWheel } from "../../../data/Emotions";
import { Dropdown } from "../../../components/ui";
import { converTimeToAMPM, formatDate, formatDateNamed, getDate } from "../../../utilities/date-helpers";


interface MoodLogModalProps {

    visible: boolean

    existingLog?: LoggedEmotion
    handleAddMoodToLog: (log: LoggedEmotion | null) => Promise<void>

    closeModal: () => void
}


const MoodLogModal: FunctionComponent<MoodLogModalProps> = (props: MoodLogModalProps) => {

    const { visible, existingLog, handleAddMoodToLog, closeModal } = props

    const [log, setLog] = useState<LoggedEmotion>(() => {
        return {
            id: existingLog?.id || Date.now(),

            createdAt: existingLog?.createdAt ?? getDate(),
            updatedAt: existingLog?.updatedAt ?? getDate(),
            dateTracked: existingLog?.dateTracked ?? new Date(),

            emotion: existingLog?.emotion ?? {
                emotion: "",
                color: "",
            },

            feelingSummary: existingLog?.feelingSummary ?? "",
        }
    })

    function handleCloseMoodLogModal() {
        if (isDatePickerOpen) handleCloseDatePicker()
        if (isTimePickerOpen) handleCloseTimePicker()
        closeModal()
    }

    //* Modal Container
    const LoggedMoodModalContainer = styled(Container)`
        justify-content: space-evenly;
        /* gap: 20px; */

        padding: 40px;

    `
    //* Tracked Date Container
    const TrackedDateContainer = styled.View`
        gap: 20px;

        width: 100%;

    `

    const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)

    function handleOpenDatePicker() { setIsDatePickerOpen(true) }
    function handleCloseDatePicker() { setIsDatePickerOpen(false) }

    const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false)

    function handleOpenTimePicker() { setIsTimePickerOpen(true) }
    function handleCloseTimePicker() { setIsTimePickerOpen(false) }

    const handleUpdateDateTime = (newDateTime: Date | undefined | null): void => {
        // close whichever is open
        if (isDatePickerOpen) handleCloseDatePicker()
        if (isTimePickerOpen) handleCloseTimePicker()
        // if the incoming date is null || is the same as the current answer, don't update.
        if (!newDateTime || newDateTime === log?.dateTracked) return;

        setLog((prev) => {
            return {
                ...prev,
                dateTracked: newDateTime,
            }
        })

    }

    //* Containers for inputs with labels
    const TrackedInputsContainer = styled.View`
        /* flex-direction: row; */
        gap: 10px;

    `

    //* Selected Feeling Container
    const SelectEmotionContainer = styled.View`
        gap: 20px;

        width: 100%;

    `
    //* Feeling Summary Container
    const FeelingSummaryContainer = styled.View`
        width: 100%;
        gap: 20px;

    `
    const FeelingSummaryTextArea = styled.TextInput`
        padding: 20px;
        min-height: 150px;

        font-size: 20px;

        border: 1px solid ${generalColors.dark_transparent};
    `

    //* General Input Container styling
    const InputContainer = styled.Pressable`
        /* flex: 1; */
        
        justify-content: center;
        align-items: center;
        
        padding: 5px 8px;
        height: 50px;
        background-color: ${generalColors.lightGray_transparent};
        
        border: 1px solid ${generalColors.dark_transparent};
    `

    
    async function handleClosingModal() {
        console.log("Entered handleSumbit() ====================")
        
        const updatedLog: LoggedEmotion = {
            id: log.id,

            createdAt: log.createdAt,
            updatedAt: log.updatedAt,
            dateTracked: log.dateTracked,

            emotion: log.emotion,

            feelingSummary: log.feelingSummary,
        }

        console.log("updatedLog: ", updatedLog)
        
        // if no feeling was selected, then this log cannot be saved.
        if (updatedLog.emotion) handleAddMoodToLog(updatedLog)
        

        handleCloseMoodLogModal()
    }

    const feelingSummaryRef = useRef<string>()

    function handleUpdateFeelignSummary(e: NativeSyntheticEvent<TextInputEndEditingEventData>) {
        const message = e.nativeEvent.text

        if (!message) return
        
        setLog((prev) => {
            return {
                ...prev,
                feelingSummary: message
            }
        })
    }

    function handleSelectionChanged(selectedEmotion: EmotionDetail) {
        console.log(selectedEmotion)
        if(selectedEmotion.emotion === "") return

        setLog((prev) => {
            return {
                ...prev,
                emotion: selectedEmotion
            }
        })
    }

    useEffect(() => {
        setLog(() => {
            return {
                id: existingLog?.id || Date.now(),

                createdAt: existingLog?.createdAt ?? getDate(),
                updatedAt: existingLog?.updatedAt ?? getDate(),
                dateTracked: existingLog?.dateTracked ?? new Date(),

                emotion: existingLog?.emotion ?? null,

                feelingSummary: existingLog?.feelingSummary ?? "",


            }
        })
    }, [visible])

    return (
        <>
            <Modal visible={visible} >
                <TopBar
                    label={`${existingLog ? "Editing" : "New"} Log`}
                    hasBackButton
                    onBackPress={handleClosingModal}
                />
                <LoggedMoodModalContainer>
                    <ScrollView
                        contentContainerStyle={{
                            rowGap: 30
                            
                        }}
                    >
                        <TrackedDateContainer>

                            <TrackedInputsContainer>
                                <HeaderTwo text="Date:" textAlignment="left" />
                                <InputContainer onPress={handleOpenDatePicker} >
                                    <HeaderThree text={formatDate(log.dateTracked)} />
                                    {/* <HeaderThree text={`${log.dateTracked}`} /> */}
                                </InputContainer>
                            </TrackedInputsContainer>

                            <TrackedInputsContainer>
                                <HeaderTwo text="Time:" textAlignment="left" />
                                <InputContainer onPress={handleOpenTimePicker} >
                                    <HeaderThree text={`${converTimeToAMPM(log.dateTracked)}`} />
                                </InputContainer>
                            </TrackedInputsContainer>

                        </TrackedDateContainer>


                        <SelectEmotionContainer>
                            <HeaderThree text="What are you feeling?" />
                            <Dropdown options={EmotionWheel} selectedEmotion={log.emotion} onChangeSelection={handleSelectionChanged} />
                        </SelectEmotionContainer>




                        <FeelingSummaryContainer>
                            <HeaderThree text="Write a little about why you might be feeling this." />
                            <FeelingSummaryTextArea
                                style={{ textAlignVertical: 'top' }}
                                multiline
                                placeholder="I feel...  I was..."
                                onEndEditing={(e: NativeSyntheticEvent<TextInputEndEditingEventData>) => handleUpdateFeelignSummary(e)}
                                defaultValue={log.feelingSummary}
                            />
                        </FeelingSummaryContainer>
                    </ScrollView>
                </LoggedMoodModalContainer>


                {isDatePickerOpen ?
                    <DateTimePicker
                        testID="datePicker"
                        value={log.dateTracked}
                        mode="date"
                        onChange={(event, selectedDate) => handleUpdateDateTime(selectedDate)}
                    />
                    :
                    null}
                {isTimePickerOpen ?
                    <DateTimePicker
                        testID="tinePicker"
                        value={log.dateTracked}
                        mode="time"
                        onChange={(event, selectedTime) => handleUpdateDateTime(selectedTime)}
                    />
                    :
                    null}
            </Modal>

        </>
    )
}

export default MoodLogModal