// dependencies --------------------------------------------------
import React, { FunctionComponent, ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import styled from "styled-components/native"
// styling --------------------------------------------------
import { textColors } from "../../../../assets"


const HeaderOneStyle = styled.Text`
    font-size: 37px;
    color: ${textColors.header_One};
    text-align: left;
    font-family: Lato-Bold;
`
export interface HeaderOneProps {
    textStyles?: StyleProp<TextStyle>;
    children: ReactNode
    onPress?: (() => void) | ((e: any) => void)
}

const HeaderOne: FunctionComponent<HeaderOneProps> = (props: HeaderOneProps) => {
    const {
        textStyles,
        children,
        onPress = () => console.log("I've been clicked!")
    } = props

    return <HeaderOneStyle style={textStyles} onPress={onPress} >{children}</HeaderOneStyle>
}

export default HeaderOne