import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { StyleSheet, Text } from "react-native";
// components --------------------------------------------------
import { Container } from "../../components/shared";
import { HeaderOne, BodyText, SubText } from "../../components/ui/text";
import { TopBar } from "../../components/ui";

// misc --------------------------------------------------
// colors
import { colors, generalColors, textColors } from "../../assets";

const JournalContainer = styled(Container)`
    background-color: ${colors.generalColors.light};
    /* justify-content: space-between; */
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
`;


const Journal: FunctionComponent = () => {

    // todo 1. Make headerbar that will contain current location, backbutton, and settings/extra buttons
    
    return (
        <>
            {/* <StatusBar style="dark" /> */}
            <TopBar label="Journal" />
            <JournalContainer>

            </JournalContainer>
        </>
    )
}

export default Journal