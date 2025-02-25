import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native'
import React, {useState} from 'react'
import {useGlobalContext} from "../context/GlobalProvider";
import InfoBox from "./InfoBox";

const FriendCard = (
    {
        friend: {
            id: id,
            name: name,
        }
    }) => {
    const {user, setUser, setIsLoggedIn} = useGlobalContext();

    return (
        <View className="mx-4 mt-4 items-start w-full">
            <View className="w-[93%] h-16 flex-row border border-primary-300 rounded-lg">
                <Image
                    source={{ uri: user?.avatar }}
                    className="w-16 h-15 rounded-lg"
                    resizeMode="cover"
                />
                <View className="w-full h-full items-start justify-between">
                    <Text className="text-2xl text-accent-200 font-psemibold ml-2 mt-3.5">
                        {name}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default FriendCard;
