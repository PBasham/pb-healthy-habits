import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { Button, ImageBackground, Modal, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TextInput, TextInputEndEditingEventData, TextInputFocusEventData, View } from "react-native";
import styled from "styled-components/native";

import DateTimePicker from '@react-native-community/datetimepicker';

import * as logHelpers from "../../../utilities/moodLog-helpers"
// components --------------------------------------------------
import { Container } from "../../shared";
import { HeaderOne, HeaderTwo, HeaderThree, BodyText, SubText } from "../../ui/text";

// misc --------------------------------------------------
// colors
import { generalColors, textColors } from "../../../assets";
import { StandardButton, TopBar } from "../../ui";
import { ContainerFlexTwo, ScreenWidth } from "../../shared/shared";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmotionDetail, LoggedEmotion, LoggedOverallEmotion } from "../../../interfaces";
import { EmotionWheel } from "../../../data/Emotions";
import { Dropdown } from "../../ui";
import { converTimeToAMPM, formatDate, formatDateNamed, getDate } from "../../../utilities/date-helpers";


interface OverallMoodModalProps {

    visible: boolean

    existingOverallEmotion?: LoggedOverallEmotion
    handleUpdateOverallMood: (log: LoggedOverallEmotion | null) => Promise<void>

    closeModal: () => void
}


const OverallMoodModal: FunctionComponent<OverallMoodModalProps> = (props: OverallMoodModalProps) => {

    const { visible, existingOverallEmotion, handleUpdateOverallMood, closeModal } = props

    const [overallMood, setOverallMood] = useState<LoggedOverallEmotion>(() => {
        return {
            id: existingOverallEmotion?.id || Date.now(),

            createdAt: existingOverallEmotion?.createdAt ?? getDate(),
            updatedAt: existingOverallEmotion?.updatedAt ?? getDate(),
            dateTracked: existingOverallEmotion?.dateTracked ?? new Date(),

            emotion: existingOverallEmotion?.emotion ?? {
                emotion: "",
                color: "",
            },
        }
    })

    function handleCloseMoodLogModal() {
        if (isDatePickerOpen) handleCloseDatePicker()
        if (isTimePickerOpen) handleCloseTimePicker()
        closeModal()
    }

    //* Modal Container
    const OverallMoodModalContainer = styled(Container)`
        margin-top: 40px;
    `
    //* Tracked Date Container
    const TrackedDateContainer = styled.View`
        gap: 20px;

        width: ${ScreenWidth - 40}px;
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
        if (!newDateTime || newDateTime === overallMood?.dateTracked) return;

        setOverallMood((prev) => {
            return {
                ...prev,
                dateTracked: newDateTime,
            }
        })

    }

    //* Containers for inputs with labels
    const TrackedInputsContainer = styled.View`
        gap: 10px;
    `

    //* Selected Feeling Container
    const SelectEmotionContainer = styled.View`
        gap: 20px;
    `
    //* Feeling Summary Container
    const FeelingSummaryContainer = styled.View`
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
            id: overallMood.id,

            createdAt: overallMood.createdAt,
            updatedAt: overallMood.updatedAt,
            dateTracked: overallMood.dateTracked,

            emotion: overallMood.emotion,
        }

        console.log("updatedLog: ", updatedLog)

        // if no feeling was selected, then this log cannot be saved.
        if (updatedLog.emotion) handleUpdateOverallMood(updatedLog)


        handleCloseMoodLogModal()
    }

    const feelingSummaryRef = useRef<string>()

    function handleUpdateFeelignSummary(e: NativeSyntheticEvent<TextInputEndEditingEventData>) {
        const message = e.nativeEvent.text

        if (!message) return

        setOverallMood((prev) => {
            return {
                ...prev,
                feelingSummary: message
            }
        })
    }

    function handleSelectionChanged(selectedEmotion: EmotionDetail) {
        console.log(selectedEmotion)
        if (selectedEmotion.emotion === "") return

        setOverallMood((prev) => {
            return {
                ...prev,
                emotion: selectedEmotion
            }
        })
    }

    useEffect(() => {
        setOverallMood(() => {
            return {
                id: existingOverallEmotion?.id || Date.now(),

                createdAt: existingOverallEmotion?.createdAt ?? getDate(),
                updatedAt: existingOverallEmotion?.updatedAt ?? getDate(),
                dateTracked: existingOverallEmotion?.dateTracked ?? new Date(),

                emotion: existingOverallEmotion?.emotion ?? null,

            }
        })
    }, [visible])

    return (
        <>
            <Modal visible={visible} >
                <TopBar
                    label={`Overall Mood`}
                    hasBackButton
                    onBackPress={handleClosingModal}
                />
                <HeaderTwo
                    text="How would you say your general mood was today?"
                    textStyles={{
                        marginTop: 40
                    }}
                />

                <OverallMoodModalContainer>
                    <ScrollView
                        contentContainerStyle={{
                            flex: 1,
                            rowGap: 30,

                        }}
                    >

                        <TrackedDateContainer>


                            <TrackedInputsContainer>
                                <HeaderTwo text="Date:" textAlignment="left" />
                                <InputContainer onPress={handleOpenDatePicker} >
                                    <HeaderThree text={formatDate(overallMood.dateTracked)} />
                                    {/* <HeaderThree text={`${log.dateTracked}`} /> */}
                                </InputContainer>
                            </TrackedInputsContainer>

                            <TrackedInputsContainer>
                                <HeaderTwo text="Time:" textAlignment="left" />
                                <InputContainer onPress={handleOpenTimePicker} >
                                    <HeaderThree text={`${converTimeToAMPM(overallMood.dateTracked)}`} />
                                </InputContainer>
                            </TrackedInputsContainer>

                        </TrackedDateContainer>


                        <SelectEmotionContainer>
                            <HeaderThree
                                text="What are you feeling?"
                            />
                            <Dropdown options={EmotionWheel} selectedEmotion={overallMood.emotion} onChangeSelection={handleSelectionChanged} />
                        </SelectEmotionContainer>
                    </ScrollView>
                </OverallMoodModalContainer>


                {isDatePickerOpen ?
                    <DateTimePicker
                        testID="datePicker"
                        value={overallMood.dateTracked}
                        mode="date"
                        onChange={(event, selectedDate) => handleUpdateDateTime(selectedDate)}
                    />
                    :
                    null}
                {isTimePickerOpen ?
                    <DateTimePicker
                        testID="tinePicker"
                        value={overallMood.dateTracked}
                        mode="time"
                        onChange={(event, selectedTime) => handleUpdateDateTime(selectedTime)}
                    />
                    :
                    null}
            </Modal>

        </>
    )
}

export default OverallMoodModal