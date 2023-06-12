// dependencies --------------------------------------------------
import React, { FunctionComponent, ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import styled from "styled-components/native"
// styling --------------------------------------------------
import { textColors } from "../../../../assets"


const HeaderTwoStyle = styled.Text`
    font-size: 32px;
    color: ${textColors.header_One};
    text-align: left;
    font-family: Lato-Bold;
`
export interface HeaderTwoProps {
    textStyles?: StyleProp<TextStyle>;
    children: ReactNode
    onPress?: (() => void) | ((e: any) => void)
}

const HeaderTwo: FunctionComponent<HeaderTwoProps> = (props: HeaderTwoProps) => {
    const {
        textStyles,
        children,
        onPress = () => console.log("I've been clicked!")
    } = props

    return <HeaderTwoStyle style={textStyles} onPress={onPress} >{children}</HeaderTwoStyle>
}

export default HeaderTwo