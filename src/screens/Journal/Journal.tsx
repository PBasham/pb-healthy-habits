import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { StyleSheet, Text } from "react-native";
// components --------------------------------------------------
import { Container } from "../../components/shared";
import { HeaderOne, BodyText } from "../../components/ui/text";

// misc --------------------------------------------------
// colors
import { colors } from "../../assets";
import { Header } from "react-native/Libraries/NewAppScreen";

const JournalContainer = styled(Container)`
    background-color: ${colors.secondary};
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
`;


const Journal: FunctionComponent = () => {
    return (
        <>
            <StatusBar style="light" />
            <JournalContainer>
                <HeaderOne textStyles={{alignSelf: 'flex-start',}} >
                    hello
                </HeaderOne>
            </JournalContainer>
        </>
    )
}

export default Journal