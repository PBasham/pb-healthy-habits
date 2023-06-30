import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

// components --------------------------------------------------
import { Container } from "../../shared";
import { HeaderOne, HeaderTwo, HeaderThree, BodyText, SubText } from "../../ui/text";

// misc --------------------------------------------------
import { Ionicons } from '@expo/vector-icons';
// colors
import { colors, generalColors, textColors } from "../../../assets";
import { StandardButton, TopBar } from "../../../components/ui";
import { ContainerFlexTwo, ScreenWidth } from "../../../components/shared/shared";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmotionDetail } from "../../../interfaces";
import { EmotionWheel } from "../../../data/Emotions";



interface DropdownProps {
    options: EmotionDetail[]

}


const Dropdown: FunctionComponent<DropdownProps> = (props: DropdownProps) => {

    const { options } = props


    const [selectedEmotion, setSelectedEmotion] = useState<EmotionDetail>({
        emotion: "",
        color: ""
    })







    const DropDownContainer = styled.View`
        position: relative;

        /* flex: 1; */
        flex-direction: row;
        height: 50px;

        
    `
    const DropDownSelected = styled.View`
        flex: 1;
        justify-content: center;
        align-items: center;
        border-color: ${colors.generalColors.dark_transparent};
        border-width: 1px;
        background-color: ${selectedEmotion.emotion ? selectedEmotion.color : ""};
    `
    const DropDownButton = styled.View`
        justify-content: center;
        align-items: center;
        width: 50px;
        /* height: 100%; */
        margin-left: auto;
        background-color: ${colors.generalColors.secondary};
        border-width: 1px;
        border-color: ${colors.generalColors.secondary};
    `

    const DropDownOptionsOuter = styled.View`
        flex: 1;
        
        top: 50px;
        width: 100%;


        border: 1px solid ${generalColors.dark_transparent};
    `
    const DropDownOptions = styled.ScrollView``

    const DropDownOption = styled.View`
        position: relative;

        justify-content: center;
        align-items: center;
        
        width: 100%;
        height: 50px;

        border: 1px solid ${generalColors.dark_transparent};
    `

    useEffect(() => { }, [])

    return (
        <>
            <DropDownContainer>
                {/* 
                //todo create selected div
                //todo create button div
            */}
                <DropDownSelected>
                    <HeaderThree text={`${selectedEmotion.emotion ? selectedEmotion.emotion : "Select Emotion"}`} />
                </DropDownSelected>

                <DropDownButton>
                    <Ionicons name="chevron-down" size={36} color={colors.textColors.dark_transparent} />
                </DropDownButton>
            </DropDownContainer>
            <DropDownOptionsOuter>
                <DropDownOptions>
                    {EmotionWheel.map((emotion) => {
                        let name: string
                        if (!emotion.emotion.length) name = ""
                        else if (emotion.emotion.length > 1) name = `${emotion.emotion.charAt(0).toUpperCase()}${emotion.emotion.slice(1)}`
                        else name = `${emotion.emotion.charAt(0).toUpperCase()}`


                        return <DropDownOption style={{ backgroundColor: emotion.color }} >
                            <HeaderThree text={name} />
                        </DropDownOption>
                    })}
                </DropDownOptions>
            </DropDownOptionsOuter>
        </>
    )
}

export default Dropdown