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

const CreateLogContainer = styled.View`
    flex: 1;
    height: 100%;
    width: 100%;
    
`

const MoodTracker: FunctionComponent = () => {
    return (
        <>
            <TopBar
                label="Mood Tracker"
            />
            <MoodTrackerContainer>
                <Container>
                    <HeaderTwo text={"How are you feeling today?"} />
                    {/* //todo Build out Log emotion button */}
                    {/* //todo Build  */}
                    <CreateLogContainer>
                    <StandardButton 
                        text="Click me"
                    />
                    </CreateLogContainer>
                </Container>
                <ContainerFlexTwo>
                    {/* //todo build out scrollable view for emotions logged today. */}
                    <BodyText text={"You haven't logged anything for today."} />
                    

                </ContainerFlexTwo>
            </MoodTrackerContainer>
        </>
    )
}

export default MoodTracker