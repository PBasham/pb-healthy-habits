import React, { FunctionComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
// components --------------------------------------------------
import { generalColors, textColors } from "../../../assets";
import { HeaderOne, HeaderThree, HeaderTwo } from "../text";
// misc --------------------------------------------------
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
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
    
    /** Direction for arrow in back button */
    backBtnDirection?: "back" | "forward" | "up" | "down"

    /** Color for background of TopBar. */
    backgroundColor?: string
    bottomBorderColor?: string

    /** Boolean for is this bar will have a back button */
    hasBackButton?: boolean
    /** Function for back button press. Can be left blank to exclude. */
    onBackPress?: (() => void) | ((e: any) => void) | (() => any) | ((e: any) => any)
    /** Boolean for is this bar will have a back button */
    hasPlusButton?: boolean
    /** Function for Plus press. Can be left blank to ecclude. */
    onPlusPress?: (() => void) | ((e: any) => void) | (() => any) | ((e: any) => any)
    /** Boolean for is this bar will have a back button */
    hasDotsButton?: boolean
    /** Function for dots press. Can be left blank to ecclude. */
    onDotsPress?: (() => void) | ((e: any) => void) | (() => any) | ((e: any) => any)
}


const TopBar: FunctionComponent<TopBarProps> = (props: TopBarProps) => {

    const {
        label,
        labelColor = textColors.dark_transparent,
        labelAlignment = "center",

        iconsColor = textColors.dark_transparent,
        backIconColor,
        dotsIconColor,

        backBtnDirection = "back",

        backgroundColor,
        bottomBorderColor,

        hasBackButton,
        onBackPress = () => console.log("Back button has been pressed!"),
        hasPlusButton,
        onPlusPress = () => console.log("Back button has been pressed!"),
        hasDotsButton,
        onDotsPress = () => console.log("Dots button has been pressed!"),
    } = props


    const TopBarContainer = styled.View`
    /* display: flex; */
    flex-direction: row;
    align-items: center;
    /* gap: 10px; */
    
    height: 60px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    /* padding-top: 10px; */
    /* padding-bottom: 10px; */
    border-bottom-width: 2px;
    border-bottom-color: ${bottomBorderColor || generalColors.borders};

    background-color: ${backgroundColor || generalColors.secondary};
`;

    const labelAlignmentOptions = {
        left: "flex-start",
        center: "center",
        right: "flex-end",
    }

    const LabelContainer = styled.View`
    justify-content: center;
    flex: 1;

    align-items: ${labelAlignmentOptions[labelAlignment]};

    padding-left: 8px;
    padding-right: ${hasBackButton && (!hasDotsButton && !hasPlusButton) ? "58px" : "8px"};

    height: 100%;
    `
    const BackBtnContainer = styled.View`
    justify-content: center;
    align-items: flex-start;

    height: 100%;
    width: 50px;
    `
    const PlusBtnContainer = styled.View`
    justify-content: center;
    align-items: flex-end;

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
                <TopBarContainer >
                    {hasBackButton ?
                        <BackBtnContainer>
                            <Ionicons
                                name={`chevron-${backBtnDirection}-outline`}
                                size={36}
                                color={backIconColor || iconsColor}
                                onPress={onBackPress}
                            />
                        </BackBtnContainer>
                        : null}
                    <LabelContainer>
                        <HeaderTwo
                            text={label}
                            textStyles={{ color: labelColor || textColors.dark_transparent }}
                        />
                    </LabelContainer>
                    {hasPlusButton ?
                        <PlusBtnContainer>
                            <Ionicons
                                name="add"
                                size={36}
                                color={dotsIconColor || iconsColor || textColors.dark_transparent}
                                onPress={onDotsPress}
                            />
                        </PlusBtnContainer>
                        : null}
                    {hasDotsButton ?
                        <DotsBtnContainer>
                            <Ionicons
                                name="ellipsis-vertical"
                                size={32}
                                color={dotsIconColor || iconsColor || textColors.dark_transparent}
                                onPress={onDotsPress}
                            />
                        </DotsBtnContainer>
                        : null}
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