import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

import * as moodTrackerHelpers from "../../utilities/emotionTracker-helpers"

// components --------------------------------------------------
import { Container } from "../../components/shared";
import { HeaderOne, HeaderTwo, HeaderThree, BodyText, SubText } from "../../components/ui/text";

// misc --------------------------------------------------
// colors
import { generalColors, textColors } from "../../assets";
import { StandardButton, TopBar } from "../../components/ui";
import { ContainerFlexTwo, ScreenWidth } from "../../components/shared/shared";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoggedEmotion } from "../../interfaces";

interface MoodTrackerProps {

}


const MoodTracker: FunctionComponent<MoodTrackerProps> = (props: MoodTrackerProps) => {

    const { } = props

    const [moodLog, setMoodLog] = useState<LoggedEmotion[] | []>([])

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


    async function handleGetMoodLog(): Promise<void> {
        const result = await moodTrackerHelpers.getMoodLog()
        console.log("Result from handleGetMoodLog(): ", result)
        if (!result.length) {
            setMoodLog(result)
            setLogMessage("You haven't logged anything for today.")
        } else {
            setLogMessage("You have stuff!")
        }

        return
    }
    async function handleAddMoodToLog(loggedMood: LoggedEmotion): Promise<void> {

        // check that loggedMood is valid
        if (!loggedMood) return

        // get updatedLog from function
        let updatedMoodLog: LoggedEmotion[] = await moodTrackerHelpers.addEntryToMoodLog(loggedMood, moodLog)


        setMoodLog(updatedMoodLog)

        return
    }

    function handleOpenMoodModal(): void {
        console.log("Entered handleOpenMoodModal() ====================")
        
    }

    useEffect(() => {

        handleGetMoodLog()

    }, [])

    return (
        <>
            <SafeAreaView edges={['top']} children={<TopBar label="Mood Tracker" />} />
            <SafeAreaView mode="padding" style={{ flex: 1 }} edges={['left', 'right']} >
                <MoodTrackerContainer>
                    <CreateLogContainer>
                        <HeaderTwo text={"How are you feeling today?"} />
                        <CreateLogButtonContainer>
                            {!moodLog.length ?
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
                                onPress={handleOpenMoodModal}
                                textStyles={{ fontWeight: "bold" }}
                            />
                        </CreateLogButtonContainer>
                    </CreateLogContainer>
                    {moodLog.length ?
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