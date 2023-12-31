// import dependencies --------------------------------------------------
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// components --------------------------------------------------

import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// screens
import { Journal, Settings, MoodTracker } from "./src/screens";
// misc --------------------------------------------------
// fonts
import { useFonts } from "expo-font"
// colors
import { generalColors, tabBarColors } from "./src/assets";
// icons
import { Ionicons } from '@expo/vector-icons';

const STORYBOOK_START: boolean = true

export default function App() {
    let [fontsLoaded] = useFonts({
        "Lato-Regular": require("./src/assets/typography/Lato/Lato-Regular.ttf"),
        "Lato-Bold": require("./src/assets/typography/Lato/Lato-Bold.ttf"),
        "Lato-Light": require("./src/assets/typography/Lato/Lato-Light.ttf"),
    })

    // if (!fontsLoaded) {
    //     return <AppLoading />
    // }

    const Tab = createBottomTabNavigator()

    const moodTrackerName = "Mood"
    const journalName = "Journal"
    // const settingsName = "Settings"

    //h LOG
    //+ Mood Tracking page
    //~ commented out Settings page from tab bar. This will be accessible from context menues on each section that needs settings.

    //TODO need to add Settings Screen as route, but not include in tab bar.



    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics} >
            <NavigationContainer>
                <Tab.Navigator
                    // tabBar={(props) => <NavBar {...props} />} // todo This would be using my own navbar that I'm passing these screens into.
                    initialRouteName={moodTrackerName}
                    screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName
                            let routeName = route.name

                            if (routeName === moodTrackerName) iconName = focused ? "happy" : "happy-outline"
                            else if (routeName === journalName) iconName = focused ? "journal" : "journal-outline"
                            // else if (routeName === settingsName) iconName = focused ? "settings" : "settings-outline"
                            else iconName = focused ? "help" : "help-outline"

                            size = 36

                            // @ts-ignore
                            return <Ionicons name={iconName} size={size} color={color} />
                        },
                        tabBarActiveTintColor: tabBarColors.iconActive,
                        tabBarInactiveTintColor: tabBarColors.iconInactive,
                        tabBarLabelStyle: {
                            paddingBottom: 10,
                            fontSize: 16
                        },
                        tabBarIconStyle: {
                            marginTop: 10,
                        },
                        tabBarStyle: {
                            height: 80,
                            backgroundColor: tabBarColors.background,
                        },
                        tabBarBadgeStyle: {
                            // backgroundColor: "pink"

                        },
                        tabBarItemStyle: {
                            // backgroundColor: "orange"
                        },
                        tabBarActiveBackgroundColor: tabBarColors.activeTabBackground,



                    })
                    }


                >
                    {/* // todo Home_Screen */}
                    <Tab.Screen name={moodTrackerName} >
                        {(props) => <MoodTracker

                        />}
                    </Tab.Screen>
                    <Tab.Screen name={journalName} >
                        {(props) => <Journal

                        />}
                    </Tab.Screen>
                    {/* // todo EmotionTracker_Screen */}
                    {/* <Tab.Screen name={settingsName} >
                    {(props) => <Settings

                    />} */}
                    {/* </Tab.Screen> */}

                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}