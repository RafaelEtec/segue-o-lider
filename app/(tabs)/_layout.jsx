import {View, Text, Image} from 'react-native';
import React from 'react';
import {Tabs, Redirect} from 'expo-router';
import icons from '../../constants/icons';
import {useGlobalContext} from "../../context/GlobalProvider";

const TabIcon = ({icon, color, focused}) => {
    return (
        <View className="items-center justify-center gap-1">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6 mt-5"
            />
            <Text
                numberOfLines={1}
                className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
                style={{color: color}}
            >
            </Text>
        </View>

    )
}

const TabsLayout = () => {
    const {loading, isLoggedIn} = useGlobalContext();

    if (!loading && !isLoggedIn) return <Redirect href="/sign-in" />;

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: '#FFBA26',
                    tabBarInactiveTintColor: '#8C8E98',
                    tabBarStyle: {
                        backgroundColor: '#191D31',
                        borderTopWidth: 1,
                        borderColor: '#FFBA26',
                        height: 60,
                    }
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Menu',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name=""
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: 'Criar',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.plus}
                                color={color}
                                name=""
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="leaderboard"
                    options={{
                        title: 'Líderes',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.star}
                                color={color}
                                name=""
                                focused={focused}
                            />
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Perfil',
                        headerShown: false,
                        tabBarIcon: ({color, focused}) => (
                            <TabIcon
                                icon={icons.person}
                                color={color}
                                name=""
                                focused={focused}
                            />
                        )
                    }}
                />
            </Tabs>
        </>
    )
}
export default TabsLayout
