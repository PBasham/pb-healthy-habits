import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { StyleSheet, Text } from "react-native";
// components --------------------------------------------------
import { Container } from "../../components/shared";
import { HeaderOne, BodyText, SubText, HeaderThree, HeaderTwo } from "../../components/ui/text";

// misc --------------------------------------------------
// colors
import { generalColors } from "../../assets";
import { TopBar } from "../../components/ui";

const MoodTrackerContainer = styled(Container)`
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
`;


const MoodTracker: FunctionComponent = () => {
    return (
        <>
            <StatusBar style="light" />
            <TopBar
                label="Mood Tracker"
            />
            <MoodTrackerContainer>
                <HeaderTwo
                    text={"How are you feeling today?"}
                />
                
            </MoodTrackerContainer>
        </>
    )
}

export default MoodTracker