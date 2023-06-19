import React, { FunctionComponent } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import DropShadow from "react-native-drop-shadow";

// misc --------------------------------------------------
// colors
import { generalColors } from "../../../../assets";
import { BodyText, HeaderThree } from "../../text";

interface StandardButtonProps {
    /** Text to display */
    text?: string
    /** Font size for text */
    fontSize?: string
    /** Color of text */
    textColor?: string
    /** Alignment for text */
    textAlignment?: "left" | "center" | "right" | " justify" | "start" | "end"


    /** Icon Name */
    iconName?: string
    /** Icon Color */
    iconColor?: string
    /** Icon Position */
    iconPosition?: string



    /** Background color of button */
    backgroundColor?: string

    /** On press funciton for header */
    onPress?: (() => void) | ((e: any) => void)
}



const StandardButton: FunctionComponent<StandardButtonProps> = (props: StandardButtonProps) => {
    const { text, fontSize, textColor, textAlignment, backgroundColor } = props

    const StandardButtonContainer = styled.Pressable`
        justify-content: center;
        align-items: center;

        min-height: 60px;
        min-width: 50%;
        max-width: 80%;
        background-color: ${backgroundColor ?? generalColors.secondary};

        shadow-color: ${generalColors.button_shadow};
        shadow-offset: 0px 0px;
        shadow-radius: 5px;
        shadow-opacity: .8;
        elevation: 10;
    `

    return (
        <StandardButtonContainer>
            <HeaderThree
                textColor="white"
                text={text}
            />
        </StandardButtonContainer>
    )
}

export default StandardButton