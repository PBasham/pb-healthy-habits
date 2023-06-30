import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

// components --------------------------------------------------
import { Container } from "../../shared";
import { HeaderOne, HeaderTwo, HeaderThree, BodyText, SubText } from "../../ui/text";

// misc --------------------------------------------------
import { Ionicons } from '@expo/vector-icons';
// colors
import { colors, generalColors, textColors } from "../../../assets";
import { StandardButton, TopBar } from "../../../components/ui";
import { ContainerFlexTwo, ScreenHeight, ScreenWidth } from "../../../components/shared/shared";
import { SafeAreaView } from "react-native-safe-area-context";
import { EmotionDetail } from "../../../interfaces";
import { EmotionWheel } from "../../../data/Emotions";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";



interface DropdownProps {
    options: EmotionDetail[]

}


const Dropdown: FunctionComponent<DropdownProps> = (props: DropdownProps) => {

    const { options } = props


    const [selectedEmotion, setSelectedEmotion] = useState<EmotionDetail>({
        emotion: "",
        color: ""
    })



    const [isOptionsVisible, setIsOptionsVisible] = useState(false)



    const DropDownContainer = styled.Pressable`
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



    const ModalInnerContainer = styled.Pressable`        
        height: ${ScreenHeight}px;
        background-color: ${generalColors.dark_transparent};
    `
    const DropDownOptionsOuter = styled.View`
        flex: 1;
                
        padding: 20px;
        /* width: 100%; */
        background-color: white;
    `
    const DropDownOptionsWrapper = styled.View`
        border: 2px solid ${generalColors.dark_transparent};
    `
    const DropDownOptions = styled.ScrollView`

    `

    const DropDownOption = styled.View`
        flex: 1;
    `
    const DropDownOptionInner = styled.Pressable`

        /* flex: 1; */

        margin: 4px;
        padding: 10px;
        /* width: 100%;
        height: 100%; */
        background-color: ${generalColors.light_transparent};
    `
    useEffect(() => { }, [])



    return (
        <>
            <DropDownContainer onPress={() => setIsOptionsVisible(!isOptionsVisible)}>
                <DropDownSelected>
                    <HeaderThree text={`${selectedEmotion.emotion ? selectedEmotion.emotion : "Select Emotion"}`} />
                </DropDownSelected>

                <DropDownButton>
                    <Ionicons name="chevron-down" size={36} color={colors.textColors.dark_transparent} />
                </DropDownButton>
            </DropDownContainer>

            <Modal
                visible={isOptionsVisible}
                transparent
                animationType="slide"
            >
                <TopBar
                    label="Select Emotion"
                    hasBackButton
                    backBtnDirection="down"
                    onBackPress={() => setIsOptionsVisible(false)}
                />
                <DropDownOptionsOuter>
                    <DropDownOptionsWrapper>
                        <DropDownOptions
                        // contentContainerStyle={{flexGrow: 1}}
                        >
                            <View>

                                {options.map((emotion, idx) => {
                                    let name: string
                                    if (!emotion.emotion.length) name = ""
                                    else if (emotion.emotion.length > 1) name = `${emotion.emotion.charAt(0).toUpperCase()}${emotion.emotion.slice(1)}`
                                    else name = `${emotion.emotion.charAt(0).toUpperCase()}`


                                    return <DropDownOption key={idx} style={{ backgroundColor: emotion.color }} >
                                        <DropDownOptionInner>
                                            <HeaderThree text={name} />
                                        </DropDownOptionInner>
                                    </DropDownOption>
                                })}
                            </View>
                        </DropDownOptions>
                    </DropDownOptionsWrapper>
                </DropDownOptionsOuter>
            </Modal>
        </>
    )
}

export default Dropdown