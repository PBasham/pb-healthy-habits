import React, { FunctionComponent } from "react";
import { Button, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons';

// misc --------------------------------------------------
// colors
import { generalColors } from "../../../../assets";
import { BodyText, HeaderThree } from "../../text";
import { buttonColors, textColors } from "../../../../assets/styling/colors";

interface StandardButtonProps {
    /** Text to display */
    text?: string
    /** Font size for text */
    fontSize?: string
    /** Case of font. */
    textCase?: "UPPER" | "lower" | "Proper"
    /** Color of text */
    textColor?: string
    /** Alignment for text */
    textAlignment?: "left" | "center" | "right" | " justify" | "start" | "end"
    /** Text styles */
    textStyles?: StyleProp<TextStyle>


    /** Icon Name */
    iconName?: string
    /** Icon Color */
    iconColor?: string
    /** Icon Size. Default is 32 */
    iconSize?: number
    /** Icon Position */
    iconPosition?: "left" | "right" | "top" | "bottom"
    /** Icon Styles */
    iconStyles?: StyleProp<TextStyle>

    /** Background color of button */
    backgroundColor?: string
    /** Button Styles */
    buttonStyles?: StyleProp<ViewStyle>

    /** On press funciton for header */
    onPress?: (() => void) | ((e: any) => void)
}



const StandardButton: FunctionComponent<StandardButtonProps> = (props: StandardButtonProps) => {
    const {
        text,
        fontSize = "24px",
        textCase,
        textColor = buttonColors.text,
        textAlignment = "center",
        textStyles,

        iconName,
        iconColor = buttonColors.icon,
        iconSize = 32,
        iconPosition = "left",
        iconStyles,

        buttonStyles,
        backgroundColor = buttonColors.background,

        onPress
    } = props

    // justify-content: center;
    // align-items: center;
    // flex-direction: row;

    // margin: 15px;
    // padding: 15px;
    const StandardButtonContainer = styled.Pressable`
        flex-direction: row;
        align-items: center;
        justify-content: center;

        padding: 10px;
        gap: 10px;
        /* width: 80%; */
        background-color: ${backgroundColor ?? generalColors.primary};

        shadow-color: ${buttonColors.shadow};
        shadow-offset: 0px 0px;
        shadow-radius: 5px;
        shadow-opacity: .8;
        elevation: 10;
    `
    const StyledButtonText = styled.Text`
        font-size: ${fontSize};
        color: ${textColor};
        text-align: ${textAlignment};
    `

    return (
        <StandardButtonContainer
            onPress={onPress}
            style={buttonStyles}
            
        >
            {iconName ?
                <Ionicons
                    // @ts-ignore
                    name={iconName}
                    color={iconColor}
                    size={iconSize}
                    style={iconStyles}
                />
                : null
            }
            {text?.length ?
            <StyledButtonText style={textStyles} >{text}</StyledButtonText>
            : null }
        </StandardButtonContainer>
    )
}

export default StandardButton