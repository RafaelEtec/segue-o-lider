import React, {useEffect} from 'react'
import {SplashScreen, Stack} from "expo-router";
import {useFonts} from "expo-font";
import "../global.css"
import * as NavigationBar from "expo-navigation-bar";
import GlobalProvider from '../context/GlobalProvider'
import {MenuProvider} from "react-native-popup-menu";
import FlashMessage from "react-native-flash-message";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Bebas-Neue": require("../assets/fonts/BebasNeue-Regular.ttf"),
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded], error);

    if (!fontsLoaded) {
        return null;
    }

    if (!fontsLoaded && !error) {
        return null;
    }

    NavigationBar.setPositionAsync("relative");
    NavigationBar.setBackgroundColorAsync("#191d31");
    NavigationBar.setButtonStyleAsync("light");

    return (
        <GlobalProvider>
            <MenuProvider>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="search/[gameId]" options={{ headerShown: false }} />
                    <Stack.Screen name="logs/[gameId]" options={{ headerShown: false }} />
                </Stack>
            </MenuProvider>
            <FlashMessage position="top" />
        </GlobalProvider>
    )
}
export default RootLayout