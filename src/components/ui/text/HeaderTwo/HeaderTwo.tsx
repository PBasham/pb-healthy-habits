// dependencies --------------------------------------------------
import React, { FunctionComponent, ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import styled from "styled-components/native"
// styling --------------------------------------------------
import { textColors } from "../../../../assets"


export interface HeaderTwoProps {
    /** Text to display */
    text?: string
    /** Alignment for text */
    textAlignment?: "left" | "center" | "right" | " justify" | "start" | "end"
    /** Color of text */
    textColor?: string

    textStyles?: StyleProp<TextStyle>;

    /** On press funciton for header */
    onPress?: (() => void) | ((e: any) => void)
}

const HeaderTwo: FunctionComponent<HeaderTwoProps> = (props: HeaderTwoProps) => {
    const {
        text,
        textAlignment = "center",
        
        textStyles,
        
        onPress = () => console.log("I've been clicked!")
    } = props

    const HeaderTwoStyle = styled.Text`
    
    color: ${textColors.header_One};

    width: 100%;
    
    font-size: 30px;
    text-align: ${textAlignment};
    font-family: Lato-Bold;

`

    return <HeaderTwoStyle style={textStyles} onPress={onPress} >{text}</HeaderTwoStyle>
}

export default HeaderTwo