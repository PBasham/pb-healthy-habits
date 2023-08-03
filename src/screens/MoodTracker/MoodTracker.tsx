import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

import * as logHelpers from "../../utilities/moodLog-helpers"

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
import MoodLogModal from "../../components/modal/MoodLogModal/MoodLogModal";

interface MoodTrackerProps {

}


const MoodTracker: FunctionComponent<MoodTrackerProps> = (props: MoodTrackerProps) => {

    const { } = props

    const [moodLog, setMoodLog] = useState<LoggedEmotion[] | []>([])

    const [logMessage, setLogMessage] = useState<string>("")


    //TODO - screen container
    //TODO - overall mood container
    //TODO - Today's entries contaienr
    const MoodTrackerContainer = styled(Container)`
        width: 100%;
        height: 100%;
        padding: 40px 20px;
        `;

    //TODO - overall mood container
    const OverallMoodContainer = styled(ContainerFlexTwo)`
        background-color: purple;
    `
    const OverallMoodInnerContainer = styled(ContainerFlexTwo)`
        
        justify-content: center;
        align-items: center;

        padding-top: 10px;
        padding-bottom: 10px;

        background-color: red;
    `
    const CreateLogContainer = styled(Container)`

    `

    //TODO - Today's entries contaienr
    const DailyEntriesContainer = styled(ContainerFlexTwo)`
        background-color: green;
    `
    const DailyEntriesInnerContainer = styled(ContainerFlexTwo)`
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: lime;
    `
    const CreateLogButtonContainer = styled(Container)`
        justify-content: center;
        align-items: center;
        gap: 40px;
    `


    async function handleGetMoodLog(): Promise<void> {
        const result = await logHelpers.getMoodLog()

        console.log("Finished getting MoodLog")

        console.log("Result from handleGetMoodLog(): ", result.length)
        if (!result.length) {
            setMoodLog(result)
            setLogMessage("You haven't logged anything for today.")
        } else {
            setLogMessage("You have stuff!")
        }

        return
    }
    async function handleAddMoodToLog(loggedMood: LoggedEmotion | null): Promise<void> {

        // check that loggedMood is valid
        if (!loggedMood) return

        // get updatedLog from function
        let updatedMoodLog: LoggedEmotion[] = await logHelpers.addEntryToMoodLog(loggedMood, moodLog)

        console.log("UpdatedMoodLog: ", updatedMoodLog)
        setMoodLog(updatedMoodLog)

        return
    }


    //* MoodLog Modal

    const [isMoodLogModalVisible, setIsMoodLogModalVisible] = useState(false)

    function handleOpenMoodModal(): void {
        console.log("Entered handleOpenMoodModal() ====================")
        setIsMoodLogModalVisible(true)
    }
    function handleCloseMoodModal(): void {
        console.log("Entered handleCloseMoodModal() ====================")
        setIsMoodLogModalVisible(false)
    }

    useEffect(() => { handleGetMoodLog() }, [])

    return (
        <>
            <MoodLogModal
                visible={isMoodLogModalVisible}
                closeModal={handleCloseMoodModal}
                handleAddMoodToLog={handleAddMoodToLog}
            />
            <SafeAreaView edges={['top']} children={<TopBar label="Mood Tracker" />} />
            <SafeAreaView mode="padding" style={{ flex: 1 }} edges={['left', 'right']} >
                <MoodTrackerContainer>
                    <OverallMoodContainer>

                        <HeaderTwo
                            text={"How are you feeling today?"}
                            textColor={textColors.dark_transparent}
                            textStyles={{
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        />
                        <OverallMoodInnerContainer>
                            {/* <CreateLogButtonContainer> */}
                            {!moodLog.length ?
                                <StandardButton
                                    text="Overall Mood"
                                    iconName="add"
                                    backgroundColor={generalColors.accent_blue}
                                    // onPress={handleOpenMoodModal}//TODO set up OVERALL mood modal
                                    textStyles={{ fontWeight: "bold" }}
                                />
                                // <HeaderThree
                                //     text={logMessage}
                                //     textStyles={{
                                //         marginBottom: 10,
                                //         width: "90%",
                                //         color: textColors.dark_transparent
                                //     }}
                                // />
                                : 
                                <HeaderTwo
                                    text="This will display the overall mood that was selected as well as have the option to modify it."
                                />
                            }
                            {/* </CreateLogButtonContainer> */}
                        </OverallMoodInnerContainer>
                    </OverallMoodContainer>
                    <DailyEntriesContainer>
                        <HeaderTwo
                            text="Today's entries"
                            textAlignment="left"
                            textColor={textColors.dark_transparent}
                            textStyles={{
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        />
                        {moodLog.length ?
                            <DailyEntriesInnerContainer>
                                <HeaderTwo
                                    text="logs logs logs logs"
                                />
                            </DailyEntriesInnerContainer>

                            :
                            <>
                                {/* //todo this needs to be a flatlist maybe? */}

                                <HeaderThree
                                    text="Nothing in log"
                                    textStyles={{
                                        marginBottom: 10,
                                        width: "90%",
                                        flex: 1,
                                        backgroundColor: "pink",
                                        color: textColors.dark_transparent
                                    }}
                                />
                            </>
                        }
                    </DailyEntriesContainer>

                    <StandardButton
                        // text={`${moodLog.length ? "" : "Log mood"}`}
                        iconName="add"
                        backgroundColor={generalColors.accent_blue}
                        onPress={handleOpenMoodModal}
                        buttonStyles={{
                            position: "absolute",
                            borderRadius: 50,
                            bottom: 20,
                            right: 20
                        }}
                        textStyles={{ fontWeight: "bold" }}
                    />
                </MoodTrackerContainer>
            </SafeAreaView>
        </>
    )
}

export default MoodTracker