// dependencies --------------------------------------------------
import React, { FunctionComponent, ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import styled from "styled-components/native"
// styling --------------------------------------------------
import { textColors } from "../../../../assets"


const HeaderTwoStyle = styled.Text`
    font-size: 37px;
    color: ${textColors.header_One};
    text-align: left;
    font-family: Lato-Bold;
`
export interface HeaderTwoProps {
    textStyles?: StyleProp<TextStyle>;
    children: ReactNode
}

const HeaderTwo: FunctionComponent<HeaderTwoProps> = (props: HeaderTwoProps) => {
    const { textStyles, children } = props

    return <HeaderTwoStyle style={textStyles} >{children}</HeaderTwoStyle>
}

export default HeaderTwo