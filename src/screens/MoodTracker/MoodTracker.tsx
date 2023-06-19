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
            <TopBar
                label="Mood Tracker"
            />
            <MoodTrackerContainer>
                <CreateLogContainer>
                    <HeaderTwo text={"How are you feeling today?"} />
                    <CreateLogButtonContainer>
                        <StandardButton
                            text="Log mood"
                            iconName="happy"
                            backgroundColor={generalColors.accent_blue}
                            onPress={() => console.log("I've been pressed!")}
                        />
                    </CreateLogButtonContainer>
                </CreateLogContainer>
                <ContainerFlexTwo>
                    {/* //todo build out scrollable view for emotions logged today. */}
                    <BodyText text={"You haven't logged anything for today."} />


                </ContainerFlexTwo>
            </MoodTrackerContainer>
        </>
    )
}

export default MoodTracker