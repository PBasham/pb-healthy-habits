// import dependencies --------------------------------------------------
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppLoading from "expo-app-loading"

import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons';
// components --------------------------------------------------
// screens
import { Journal } from "./src/screens";
import { Settings } from "./src/screens"
// misc --------------------------------------------------
// fonts
import { useFonts } from "expo-font"
import { generalColors } from "./src/assets";


export default function App() {
    let [fontsLoaded] = useFonts({
        "Lato-Regular": require("./src/assets/typography/Lato/Lato-Regular.ttf"),
        "Lato-Bold": require("./src/assets/typography/Lato/Lato-Bold.ttf"),
        "Lato-Light": require("./src/assets/typography/Lato/Lato-Light.ttf"),
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }

    const Tab = createBottomTabNavigator()

    const homeName = "Home"
    const journalName = "Journal"
    const settingsName = "Settings"

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={journalName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName
                        let routeName = route.name

                        if (routeName === journalName) {
                            iconName = focused ? "journal" : "journal-outline"
                        } else if (routeName === settingsName) {
                            iconName = focused ? "settings" : "settings-outline"
                        } else {
                            iconName = focused ? "help" : "help-outline"
                        }
                        // @ts-ignore
                        return <Ionicons name={iconName} size={size} color={color} />

                    },
                    tabBarActiveTintColor: "tomato",
                    tabBarInactiveTintColor: "gray",
                    tabBarLabelStyle: {
                        paddingBottom: 10,
                        fontSize: 10
                    },
                    tabBarStyle: {
                        padding: 10,
                        height: 70,
                        backgroundColor: generalColors.light
                    }
                })}


            >
                <Tab.Screen name={journalName} component={Journal} />
                <Tab.Screen name={settingsName} component={Settings} />

            </Tab.Navigator>
        </NavigationContainer>
        // <Journal />
        // <Settings />
    );
}