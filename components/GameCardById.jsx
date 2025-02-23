import {View, Text, TextInput, TouchableOpacity, Image, FlatList, RefreshControl} from 'react-native'
import React, {useState} from 'react'
import icons from "../constants/icons";
import GameCard from "./GameCard";
import SearchInput from "./SearchInput";
import EmptyState from "./EmptyState";
import {SafeAreaView} from "react-native-safe-area-context";
import Moment from "moment/moment";
import {router} from "expo-router";

const GameCardById = (
    {
        participants: {
            accountId,
            accountName,
            accountAvatar,
            points
        }
    }) => {
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
                            {username} {Moment(dateCreated).format('DD/MM/YYYY')}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default GameCardById
