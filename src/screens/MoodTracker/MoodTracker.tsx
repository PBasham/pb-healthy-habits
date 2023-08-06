import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

import * as logHelpers from "../../utilities/moodLog-helpers"
import * as datehelpers from "../../utilities/date-helpers"

// components --------------------------------------------------
import { Container } from "../../components/shared";
import { HeaderOne, HeaderTwo, HeaderThree, BodyText, SubText } from "../../components/ui/text";
import { LoggedEmotion, LoggedOverallEmotion } from "../../interfaces";
import { MoodLogModal, OverallMoodModal } from "../../components/modal";

import { StandardButton, TopBar } from "../../components/ui";

import { ContainerFlexTwo, ScreenWidth } from "../../components/shared/shared";

// misc --------------------------------------------------
// colors
import { generalColors, textColors } from "../../assets";
import { SafeAreaView } from "react-native-safe-area-context";

interface MoodTrackerProps {

}


const MoodTracker: FunctionComponent<MoodTrackerProps> = (props: MoodTrackerProps) => {

    const { } = props

    const [overallMood, setOverallMood] = useState<LoggedOverallEmotion | null>(null)

    const [moodLog, setMoodLog] = useState<LoggedEmotion[] | []>([])

    const [logMessage, setLogMessage] = useState<string>("")
    
    const [overallMoodMessage, setOverallMoodMessage] = useState<string>("")


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


    //* OverallMood
    async function handleGetOverallMood(): Promise<void> {
        console.log("Entered handleGetOverallMood() =====")
        const result = await logHelpers.getOverallMood()

        console.log("Finished getting overallMood")

        console.log("Result from handleGetOverallMood(): ", result)
        if (!result) {
            setOverallMoodMessage("You haven't logged anything for today.")
        } else {
            setOverallMoodMessage("You have something!")
        }
        setOverallMood(result)

        return
    }

    const handleUpdateOverallMood = async (overallMood: LoggedOverallEmotion | null): Promise<void> => {
        console.log("Entered handleUpdateOverallMood() ===== with: ", overallMood)
        if (!overallMood) return;

        let result = await logHelpers.storeOverallMood(overallMood);
        console.log(`Storing overallMood was successful: ${result}`)
        if (!result) return; //TODO - set up popup message saying there was an error.
        setOverallMood(overallMood)
        setOverallMoodMessage("There is something in here!")
        

    }

    //* OverallMoodLog Modal

    const [isOverallMoodModalVisible, setIsOverallMoodModalVisible] = useState(false)

    function handleOpenOverallMoodModal(): void {
        console.log("Entered handleOpenMoodModal() ====================")
        setIsOverallMoodModalVisible(true)
    }
    function handleCloseOverallMoodModal(): void {
        console.log("Entered handleCloseMoodModal() ====================")
        setIsOverallMoodModalVisible(false)
    }


    //* MoodLog
    async function handleGetMoodLog(): Promise<void> {
        console.log("Entered handleGetMoodLog() =====")
        const result = await logHelpers.getMoodLog()

        console.log("Finished getting MoodLog")

        console.log("Result from handleGetMoodLog(): ", result.length)
        if (!result.length) {
            setLogMessage("You haven't logged anything for today.")
        } else {
            setLogMessage("You have stuff!")
        }
        setMoodLog(result)
        
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

    useEffect(() => { 
        handleGetMoodLog() 
        handleGetOverallMood()
    }, [])

    return (
        <>
            <MoodLogModal
                visible={isMoodLogModalVisible}
                closeModal={handleCloseMoodModal}
                handleAddMoodToLog={handleAddMoodToLog}
            />
            <OverallMoodModal
                visible={isOverallMoodModalVisible}
                closeModal={handleCloseOverallMoodModal}
                handleUpdateOverallMood={handleUpdateOverallMood}
            />
            {/* //TODO - Create Modal for OverallMood and associated functions, ie: open, close, ect. */}
            <SafeAreaView edges={['top']} children={<TopBar label="Mood Tracker" />} />
            <SafeAreaView mode="padding" style={{ flex: 1 }} edges={['left', 'right']} >
                <MoodTrackerContainer>
                    <OverallMoodContainer>

                        <HeaderTwo
                            text={"How are you feeling today?"}
                            textAlignment="left"
                            textColor={textColors.dark_transparent}
                            textStyles={{
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        />
                        <OverallMoodInnerContainer>
                            {/* <CreateLogButtonContainer> */}
                            {!overallMood ?
                                <StandardButton
                                    text="Overall Mood"
                                    iconName="add"
                                    backgroundColor={generalColors.accent_blue}
                                    onPress={handleOpenOverallMoodModal}
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
                                    text={`${overallMood.emotion?.emotion} - ${overallMoodMessage}`}
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
                                {moodLog.map((log) => {

                                    const logDate = datehelpers.formatDateNamedAndTime(log.dateTracked)
                                    
                                    const logText = `${log.emotion?.emotion} - ${logDate}`

                                    return (
                                        <BodyText text={logText} />
                                    )
                                })}
                            </DailyEntriesInnerContainer>

                            :
                            <>
                                {/* //todo this needs to be a flatlist maybe? */}

                                <HeaderThree
                                    text={logMessage}
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