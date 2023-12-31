import React, { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { StyleSheet, Text } from "react-native";
// components --------------------------------------------------
import { Container } from "../../components/shared";
import { HeaderOne, BodyText, SubText } from "../../components/ui/text";

// misc --------------------------------------------------
// colors
import { colors } from "../../assets";

const SettingsContainer = styled(Container)`
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 40px;
    padding-bottom: 40px;
`;


const Settings: FunctionComponent = () => {
    return (
        <>
            <StatusBar style="light" />
            <SettingsContainer>
                <HeaderOne />
            </SettingsContainer>
        </>
    )
}

export default Settings