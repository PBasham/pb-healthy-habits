// dependencies --------------------------------------------------
import React, { FunctionComponent, ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import styled from "styled-components/native"
// styling --------------------------------------------------
import { textColors } from "../../../../assets"


export interface HeaderTwoProps {
    /** Text to display */
    text?: string
    /** Font size for text */
    fontSize?: string
    /** Color of text */
    textColor?: string
    /** Alignment for text */
    textAlignment?: "left" | "center" | "right" | " justify" | "start" | "end"
    /** Vertical Alignment for text */
    textVerticalAlignment?: "top" | "middle" | "bottom"

    /** Additional css styling */
    textStyles?: StyleProp<TextStyle>;

    /** On press funciton for header */
    onPress?: (() => void) | ((e: any) => void)
}

const HeaderTwo: FunctionComponent<HeaderTwoProps> = (props: HeaderTwoProps) => {
    const {
        text,
        fontSize = "28px",
        textColor = textColors.header_Two,
        textAlignment = "center",
        textVerticalAlignment = "middle",

        textStyles,

        onPress = () => console.log("I've been clicked!")
    } = props

    const HeaderTwoStyle = styled.Text`
    /* padding-bottom: 5px; */
    width: 100%;
    /* min-height: 35px; */

    color: ${textColor};
    
    font-size: ${fontSize};
    text-align: ${textAlignment};
    vertical-align: ${textVerticalAlignment};
    /* font-weight: bold; */
    /* font-family: Lato-Bold; */

`

    return <HeaderTwoStyle style={textStyles} onPress={onPress} >{text}</HeaderTwoStyle>
}

export default HeaderTwo