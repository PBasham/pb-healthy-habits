import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { Button, StyleSheet, Text, View } from "react-native";
// components --------------------------------------------------
import { Container } from "../../components/shared";
import { HeaderOne, HeaderTwo, HeaderThree, BodyText, SubText } from "../../components/ui/text";

// misc --------------------------------------------------
// colors
import { generalColors } from "../../assets";
import { StandardButton, TopBar } from "../../components/ui";
import { ContainerFlexTwo } from "../../components/shared/shared";
import { SafeAreaView } from "react-native-safe-area-context";

const MoodTrackerContainer = styled(Container)`
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
`;

const CreateLogContainer = styled(Container)`

`
const CreateLogButtonContainer = styled(Container)`
    justify-content: center;
    align-items: center;
`

const MoodTracker: FunctionComponent = () => {
    return (
        <>
            <SafeAreaView edges={['top']} >
                <TopBar
                    label="Mood Tracker"
                />
            </SafeAreaView>
            <SafeAreaView mode="padding" style={{flex: 1}} edges={['left', 'right']} >
                <MoodTrackerContainer>
                    <CreateLogContainer>
                        <HeaderTwo text={"How are you feeling today?"} />
                        <CreateLogButtonContainer>
                            <StandardButton
                                text="Log mood"
                                iconName="add"
                                backgroundColor={generalColors.accent_blue}
                                onPress={() => console.log("I've been pressed!")}
                                textStyles={{ fontWeight: "bold" }}
                            />
                        </CreateLogButtonContainer>
                    </CreateLogContainer>
                    <ContainerFlexTwo>
                        {/* //todo build out scrollable view for emotions logged today. */}
                        <BodyText text={"You haven't logged anything for today."} />


                    </ContainerFlexTwo>
                </MoodTrackerContainer>
            </SafeAreaView>
        </>
    )
}

export default MoodTracker