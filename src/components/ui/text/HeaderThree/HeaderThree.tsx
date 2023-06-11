// dependencies --------------------------------------------------
import React, { FunctionComponent, ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import styled from "styled-components/native"
// styling --------------------------------------------------
import { textColors } from "../../../../assets"


const HeaderThreeStyle = styled.Text`
    font-size: 37px;
    color: ${textColors.header_Three};
    text-align: left;
    font-family: Lato-Bold;
`
export interface HeaderThreeProps {
    textStyles?: StyleProp<TextStyle>;
    children: ReactNode
    onPress?: (() => void) | ((e: any) => void)
}

const HeaderThree: FunctionComponent<HeaderThreeProps> = (props: HeaderThreeProps) => {
    const {
        textStyles,
        children,
        onPress = () => console.log("I've been clicked!")
    } = props

    return <HeaderThreeStyle style={textStyles} onPress={onPress} >{children}</HeaderThreeStyle>
}

export default HeaderThree