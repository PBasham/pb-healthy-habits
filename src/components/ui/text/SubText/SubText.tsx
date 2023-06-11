// dependencies --------------------------------------------------
import React, { FunctionComponent, ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import styled from "styled-components/native"
// styling --------------------------------------------------
import { colors } from "../../../../assets"


const SubTextStyle = styled.Text`
    font-size: 13px;
    color: ${colors.gray};
    text-align: left;
    font-family: Lato-Regular;
`
export interface SubTextProps {
    textStyles?: StyleProp<TextStyle>;
    children: ReactNode
}

const SubText: FunctionComponent<SubTextProps> = (props: SubTextProps) => {
    const { textStyles, children } = props

    return <SubTextStyle style={textStyles} >{children}</SubTextStyle>
}

export default SubText