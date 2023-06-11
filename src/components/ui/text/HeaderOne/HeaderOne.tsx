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
}

const HeaderOne: FunctionComponent<HeaderOneProps> = (props: HeaderOneProps) => {
    const { textStyles, children } = props

    return <HeaderOneStyle style={textStyles} >{children}</HeaderOneStyle>
}

export default HeaderOne