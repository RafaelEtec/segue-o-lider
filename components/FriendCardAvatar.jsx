import {View, Image} from 'react-native'
import React from 'react'

const FriendCardAvatar = (
    {
        friend: {
            avatar,
        }
    }) => {

    return (
        <View className="w-full h-16 flex-row mt-4">
            <Image
                source={{uri: avatar}}
                className="w-16 h-16 rounded-lg"
                resizeMode="cover"
            />
        </View>
    );

}

export default FriendCardAvatar;
