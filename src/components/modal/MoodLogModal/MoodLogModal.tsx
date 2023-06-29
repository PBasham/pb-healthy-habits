import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

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
        
    `
    const SelectEmotionContainer = styled.View`
        
    `
    const FeelingSummaryContainer = styled.View`
        
    `

    useEffect(() => {

    }, [])

    return (
        <>
            <Modal visible={visible}  >
                <TopBar
                    label={`${existingLog ? "Editing" : "New"} Log`}
                    hasBackButton
                    onBackPress={closeModal}
                    // hasDotsButton
                    hasPlusButton
                />
                <LoggedMoodModalContainer>
                    <TrackedTimeContainer>
                        <HeaderThree text="Time Tracked:" textAlignment="left" />
                    </TrackedTimeContainer>
                    <SelectEmotionContainer>
                        <HeaderThree text="What are you feeling?" textAlignment="left" />
                    </SelectEmotionContainer>
                    <FeelingSummaryContainer>
                        <HeaderThree text="Write a little about why you might be feeling this." textAlignment="left" />
                    </FeelingSummaryContainer>
                </LoggedMoodModalContainer>
            </Modal>
        </>
    )
}

export default MoodLogModal