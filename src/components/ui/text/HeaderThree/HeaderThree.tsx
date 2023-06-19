// dependencies --------------------------------------------------
import React, { FunctionComponent, ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import styled from "styled-components/native"
// styling --------------------------------------------------
import { textColors } from "../../../../assets"


export interface HeaderThreeProps {
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

const HeaderThree: FunctionComponent<HeaderThreeProps> = (props: HeaderThreeProps) => {
    const {
        text,
        fontSize = "24px",
        textColor = textColors.header_Three,
        textAlignment = "center",
        textVerticalAlignment = "middle",

        textStyles,

        onPress
    } = props

    const HeaderThreeStyle = styled.Text`    
    color: ${textColor};
    
    font-size: ${fontSize};
    text-align: ${textAlignment};
    vertical-align: ${textVerticalAlignment};
    /* font-family: Lato-Bold; */
`

    return <HeaderThreeStyle style={textStyles} onPress={onPress} >{text}</HeaderThreeStyle>
}

export default HeaderThree