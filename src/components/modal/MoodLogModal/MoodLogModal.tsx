import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import styled from "styled-components/native";

import DateTimePicker from '@react-native-community/datetimepicker';
// components --------------------------------------------------
import { Container } from "../../shared";
import { HeaderOne, HeaderTwo, HeaderThree, BodyText, SubText } from "../../ui/text";

// misc --------------------------------------------------
// colors
import { generalColors, textColors } from "../../../assets";
import { StandardButton, TopBar } from "../../../components/ui";
import { ContainerFlexTwo, ScreenWidth } from "../../../components/shared/shared";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoggedEmotion } from "../../../interfaces";
import { EmotionWheel } from "../../../data/Emotions";
import { Dropdown } from "../../../components/ui";
import { formatDate, formatDateNamed, getDate } from "../../../utilities/date-helpers";


interface MoodLogModalProps {

    visible: boolean

    existingLog?: LoggedEmotion

    closeModal: () => void
}


const MoodLogModal: FunctionComponent<MoodLogModalProps> = (props: MoodLogModalProps) => {

    const { visible, existingLog, closeModal } = props

    const LoggedMoodModalContainer = styled(Container)`
        justify-content: flex-start;
        gap: 40px;
        padding: 20px;
        
        `

    const TrackedTimeContainer = styled.View`
        gap: 10px;
        width: 100%;
    `
    const SelectEmotionContainer = styled.View`
        gap: 10px;
        width: 100%;
    `
    const FeelingSummaryContainer = styled.View`
        
    `

    const [log, setLog] = useState<LoggedEmotion>(() => {
        
        // let currentDate = new Date().get
        
        return {
            id: existingLog?.id || Date.now(),
            
            createdAt: existingLog?.createdAt ?? getDate(),
            updatedAt: existingLog?.updatedAt ?? getDate(),
            timeTracked: existingLog?.timeTracked ?? new Date(),
            
            emotion: {
                emotion: "",
                color: "",
            },
            
            feelingSummary: "",
            
            
        }
    })


    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    function handleOpenDatePicker() { setIsDatePickerOpen(true) }
    function handleCloseDatePicker() { setIsDatePickerOpen(false) }

    useEffect(() => {

    }, [])



    const InputContainer = styled.Pressable`

        justify-content: center;
        align-items: center;
        
        height: 50px;
        
        border: 1px solid ${generalColors.dark_transparent};
    `

    return (
        <>
            <Modal visible={visible}  >
                <TopBar
                    label={`${existingLog ? "Editing" : "New"} Log`}
                    hasBackButton
                    onBackPress={closeModal}
                />
                <LoggedMoodModalContainer>
                    <TrackedTimeContainer>
                        <HeaderThree text="Time Tracked" />
                        <InputContainer onPress={handleOpenDatePicker} >
                            <HeaderThree text={formatDate(log.timeTracked)} />
                        </InputContainer>
                        {/* <HeaderThree text={`${log.timeTracked}`} /> */}
                        
                    </TrackedTimeContainer>
                    <SelectEmotionContainer>
                        <HeaderThree text="What are you feeling?" />
                        <Dropdown options={EmotionWheel} />
                    </SelectEmotionContainer>
                    <FeelingSummaryContainer>
                        <HeaderThree text="Write a little about why you might be feeling this." />
                        <TextInput
                            // value={}
                            multiline
                            placeholder="I feel...  I was..."
                            // style={[styles.input, styles.entry]}
                            onChangeText={(text) => console.log("Text has changed!: ", text)}
                        />
                    </FeelingSummaryContainer>
                </LoggedMoodModalContainer>
                {isDatePickerOpen ?
                <DateTimePicker
                    testID="datePicker"
                    value={log.timeTracked}
                    mode="date"
                    onChange={(event, selectedDate) => console.log(selectedDate)}
                />
                :
                null}
            </Modal>
            
        </>
    )
}

export default MoodLogModal