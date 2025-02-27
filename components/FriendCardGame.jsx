import {View, Text, Image} from 'react-native'
import React from 'react'

const FriendCardGame = (
    {
        friend: {
            avatar,
            username,
        }
    }) => {

    return (
        <View className="w-full h-16 flex-row mt-4">
            <Image
                source={{uri: avatar}}
                className="w-16 h-16 rounded-lg"
                resizeMode="cover"
            />
            <View className="flex-1 items-start justify-start">
                <Text className="text-2xl text-accent-200 font-psemibold ml-2 mt-3.5" numberOfLines={1}>
                    {username}
                </Text>
            </View>
        </View>
    );

}

export default FriendCardGame;
