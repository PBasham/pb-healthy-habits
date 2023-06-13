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



interface TopBarProps {
    /** Heading that will display on bar. */
    label?: string
    /** Color for all icons. */
    labelColor?: string
    /** Vertical Alighment for label. */
    labelAlignment?: "left" | "center" | "right"

    /** Color for all icons. */
    iconsColor?: string
    /** Color for back icons. */
    backIconColor?: string
    /** Color for dots icons. */
    dotsIconColor?: string

    /** Color for background of TopBar. */
    backgroundColor?: string
    bottomBorderColor?: string

    /** Function for back button press. Can be left blank to exclude. */
    onBackPress?: (() => void) | ((e: any) => void) | (() => any) | ((e: any) => any)
    /** Function for dots press. Can be left blank to ecclude. */
    onDotsPress?: (() => void) | ((e: any) => void) | (() => any) | ((e: any) => any)
}


const TopBar: FunctionComponent<TopBarProps> = (props: TopBarProps) => {

    const {
        label,
        labelColor,
        labelAlignment = "center",

        iconsColor,
        backIconColor,
        dotsIconColor,

        backgroundColor,
        bottomBorderColor,

        onBackPress = () => console.log("Back button has been pressed!"),
        onDotsPress = () => console.log("Dots button has been pressed!"),
    } = props


    const TopBarContainer = styled.View`
    /* display: flex; */
    flex-direction: row;
    align-items: center;
    /* gap: 10px; */
    
    height: 100px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 40px;
    padding-bottom: 20px;
    border-bottom-width: 2px;
    border-bottom-color: ${bottomBorderColor || generalColors.borders};

    background-color: ${backgroundColor || generalColors.secondary};
`;

    const LabelContainer = styled.View`
    justify-content: center;
    flex: 1;

    align-items: ${labelAlignment};

    padding-left: 8px;
    padding-right: 8px;
    height: 100%;
    `
    const BackBtnContainer = styled.View`
    justify-content: center;
    align-items: flex-start;

    height: 100%;
    width: 50px;
    `
    const DotsBtnContainer = styled.View`
    justify-content: center;
    align-items: flex-end;

    height: 100%;
    width: 50px;
    `


    return (
        <>
            <StatusBar style="light" />
            <TopBarContainer >
                <BackBtnContainer>
                    <Ionicons
                        name="chevron-back-outline"
                        size={36}
                        color={backIconColor || iconsColor || textColors.dark_transparent}
                        onPress={onBackPress}
                    />
                </BackBtnContainer>
                <LabelContainer>
                    <HeaderThree textStyles={{ color: labelColor || textColors.dark_transparent }}>
                        {label}
                    </HeaderThree>
                </LabelContainer>
                <DotsBtnContainer>
                    <Ionicons
                        name="ellipsis-vertical"
                        size={36}
                        color={dotsIconColor || iconsColor || textColors.dark_transparent}
                        onPress={onDotsPress}
                    />
                </DotsBtnContainer>
            </TopBarContainer>
        </>
    )
}

export default TopBar

const styles = StyleSheet.create({
    // innerViews: {
    //     flex: 1,
    //     height: "50",ß

    //     // justifyContent: 'center',
    //     // alignItems: "center"
    // },
    backButtonView: {
        backgroundColor: "lightblue",
    },
    labelView: {
        // flex: 1,
        backgroundColor: "navyblue",
    },
    ellipsisView: {
        backgroundColor: "darkblue",
    }
});