// import dependencies --------------------------------------------------
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppLoading from "expo-app-loading"

// components --------------------------------------------------
// screens
import { Journal } from "./src/screens";
import { Settings } from "./src/screens"
// misc --------------------------------------------------
// fonts
import { useFonts } from "expo-font"


export default function App() {
    let [fontsLoaded] = useFonts({
        "Lato-Regular": require("./src/assets/typography/Lato/Lato-Regular.ttf"),
        "Lato-Bold": require("./src/assets/typography/Lato/Lato-Bold.ttf"),
        "Lato-Light": require("./src/assets/typography/Lato/Lato-Light.ttf"),
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }
    
    return (
        <Journal />
        // <Settings />
    );
}