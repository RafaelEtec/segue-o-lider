import {View, Text, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import Moment from 'moment';
import {router, usePathname} from 'expo-router';

const GameCard = (
    {game: {
        title,
        thumbnail,
        creator: {
            username,
            avatar
        },
        gameId,
        dateCreated,
        $createdAt,
    } }) => {

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-primary-300 justify-center items-center p-0.5">
                        <Image
                            source={{uri: avatar}}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-accent-200 font-psemibold text-sm" numberOfLines={1}>
                            {title}
                        </Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                            {username} {Moment($createdAt).format('DD/MM/YYYY')}
                        </Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    router.push(`/search/${gameId}`);
                }}
                className="w-full h-60 rounded-xl mt-3 relative justify-center items-center">
                <Image
                    source={{uri: thumbnail}}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </View>
    )
}

export default GameCard
