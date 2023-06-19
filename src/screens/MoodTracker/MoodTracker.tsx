import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

import * as emotionTrackerHelpers from "../../utilities/emotionTracker-helpers"

// components --------------------------------------------------
import { Container } from "../../components/shared";
import { HeaderOne, HeaderTwo, HeaderThree, BodyText, SubText } from "../../components/ui/text";

// misc --------------------------------------------------
// colors
import { generalColors, textColors } from "../../assets";
import { StandardButton, TopBar } from "../../components/ui";
import { ContainerFlexTwo, ScreenWidth } from "../../components/shared/shared";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmotionLog, LoggedEmotion } from "../../interfaces";

interface MoodTrackerProps {

}


const MoodTracker: FunctionComponent<MoodTrackerProps> = (props: MoodTrackerProps) => {

    const { } = props

    const [emotionsLog, setEmotionsLog] = useState<EmotionLog | null>(null)

    const [logMessage, setLogMessage] = useState<string>("")

    const MoodTrackerContainer = styled(Container)`
        width: 100%;
        height: 100%;
        padding: 40px 20px;
    `;

    const CreateLogContainer = styled(Container)`
        
    `
    const CreateLogButtonContainer = styled(Container)`
        justify-content: center;
        align-items: center;
        gap: 40px;
    `


    async function handleGetEmotionLog(): Promise<void> {
        const result: EmotionLog | null = await emotionTrackerHelpers.getEmotionLog()

        if (!result) {
            setEmotionsLog(result)
            setLogMessage("You haven't logged anything for today.")
        } else {
            setLogMessage("You have stuff!")
        }

        return
    }
    async function handleAddEmotion(loggedEmotion: LoggedEmotion): Promise<void> {

        if (!emotionsLog) return
        if (!loggedEmotion) return


        let updatedEmotionLog: EmotionLog = [
            ...emotionsLog,
            { ...loggedEmotion }
        ]

        setEmotionsLog((prev: EmotionLog) => {
            if (!prev) prev = []

            return [
                ...prev,
                ...updatedEmotionLog!
            ]
        })

        return
    }

    function handleOpenEmotionModal() {

    }

    useEffect(() => {

        handleGetEmotionLog()

    }, [])

    return (
        <>
            <SafeAreaView edges={['top']} children={<TopBar label="Mood Tracker" />} />
            <SafeAreaView mode="padding" style={{ flex: 1 }} edges={['left', 'right']} >
                <MoodTrackerContainer>
                    <CreateLogContainer>
                        <HeaderTwo text={"How are you feeling today?"} />
                        <CreateLogButtonContainer>
                            {!emotionsLog ?
                                <HeaderThree
                                    text={logMessage}
                                    textStyles={{
                                        marginBottom: 10,
                                        width: "90%",
                                        color: textColors.dark_transparent
                                    }}
                                />
                                : null
                            }
                            <StandardButton
                                text="Log mood"
                                iconName="add"
                                backgroundColor={generalColors.accent_blue}
                                onPress={() => console.log("I've been pressed!")}
                                textStyles={{ fontWeight: "bold" }}
                            />
                        </CreateLogButtonContainer>
                    </CreateLogContainer>
                    {emotionsLog ?
                        <ContainerFlexTwo>
                        </ContainerFlexTwo>

                        :
                        null
                    }
                </MoodTrackerContainer>
            </SafeAreaView>
        </>
    )
}

export default MoodTracker