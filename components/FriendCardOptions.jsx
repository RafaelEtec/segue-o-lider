import {View, Text, Image} from 'react-native'
import React from 'react'

const FriendCardOptions = (
    {
        friend: {
            avatar,
            username,
            status
        }
    }) => {
    let showStatus = "";
    if (status === "pending") showStatus = "Aguardando confirmação";

    return (
        <View className="w-[93%] h-16 flex-row mt-4">
            <Image
                source={{ uri: avatar }}
                className="w-16 h-15 rounded-lg"
                resizeMode="cover"
            />
            <View className="w-full h-full items-start justify-between">
                <Text className="text-2xl text-accent-200 font-psemibold ml-2 mt-3.5" numberOfLines={1}>
                    {username}
                </Text>
                <Text className="text-sm text-gray-100 font-psemibold ml-2" numberOfLines={1}>
                    {showStatus}
                </Text>
            </View>
        </View>
    )
}

export default FriendCardOptions;
