import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { generalColors, textColors } from "../../assets";


export const Container = styled.View`
    flex: 1;
    align-items: center;
    
    width: 100%;
    height: 100%;
    background-color: ${generalColors.light};
`

export const ContainerFlexTwo = styled.View`
    flex: 2;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: ${generalColors.light};

`
export const ContainerFlexThree = styled.View`
    flex: 3;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: ${generalColors.light};
`


// dimensions
export const ScreenWidth = Dimensions.get("screen").width
export const ScreenHeight = Dimensions.get("screen").height