// dependencies --------------------------------------------------
import React, { FunctionComponent, ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import styled from "styled-components/native"
// styling --------------------------------------------------
import { colors } from "../../../../assets"


const BodyTextStyle = styled.Text`
    font-size: 16px;
    color: ${colors.gray};
    text-align: left;
    font-family: Lato-Regular;
`
export interface BodyTextProps {
    textStyles?: StyleProp<TextStyle>;
    children: ReactNode
}

const BodyText: FunctionComponent<BodyTextProps> = (props: BodyTextProps) => {
    const { textStyles, children } = props

    return <BodyTextStyle style={textStyles} >{children}</BodyTextStyle>
}

export default BodyText