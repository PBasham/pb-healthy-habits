import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
// components --------------------------------------------------
import { generalColors, textColors } from "../../../assets";
import { HeaderOne, HeaderThree, HeaderTwo } from "../text";
// misc --------------------------------------------------
import { Ionicons } from '@expo/vector-icons';
// colors

const TopBarContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 40px;
    padding-bottom: 20px;
    border-bottom-width: 2px;
    border-bottom-color: ${generalColors.borders};

    background-color: ${generalColors.secondary};

`;

interface TopBarProps {
    /** */
    label?: string
    
    /** */
    onBackPress?: (() => void) | ((e:any) => void) | (() => any) | ((e:any) => any)
    /** */
    onDotsPress?: (() => void) | ((e:any) => void) | (() => any) | ((e:any) => any)
}


const TopBar: FunctionComponent = () => {

    // todo 1. Make headerbar that will contain current location, backbutton, and settings/extra buttons

    return (
        <>
            <StatusBar style="light" />
            <TopBarContainer  >
                <Ionicons name="chevron-back-outline" size={36} color={textColors.dark_transparent}/>
                <HeaderThree textStyles={{color: textColors.dark_transparent}}>
                    
                </HeaderThree>
            </TopBarContainer>
        </>
    )
}

export default TopBar