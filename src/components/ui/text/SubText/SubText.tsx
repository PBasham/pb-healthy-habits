// dependencies --------------------------------------------------
import React, { FunctionComponent, ReactNode } from 'react'
import { StyleProp, TextStyle } from 'react-native'
import styled from "styled-components/native"
// styling --------------------------------------------------
import { textColors } from "../../../../assets"


const SubTextStyle = styled.Text`
    font-size: 13px;
    color: ${textColors.subText};
    text-align: left;
    font-family: Lato-Regular;
`
export interface SubTextProps {
    textStyles?: StyleProp<TextStyle>;
    children: ReactNode;
    onPress?: (() => void) | ((e: any) => void);
}

const SubText: FunctionComponent<SubTextProps> = (props: SubTextProps) => {
    const { 
        textStyles, 
        children, 
        onPress = () => console.log("I've been clicked!"),
    } = props

    return <SubTextStyle style={textStyles} onPress={onPress} >{children}</SubTextStyle>
}

export default SubText