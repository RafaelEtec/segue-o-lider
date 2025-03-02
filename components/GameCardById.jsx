import {View, Text, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import icons from "../constants/icons";
import {addPoint, takePoint} from "../lib/appwrite";

const GameCardById = (
    {
        participants: {
            accountId: {
                avatar,
                username,
            },
            points
        },
        partId: id
    }) => {

    const [point, setPoint] = useState(points)
    const add = async () => {
        await addPoint(id, point);
        setPoint(point+1);
    }
    const take = async () => {
        await takePoint(id, point);
        setPoint(point-1);
    }

    return (
        <View className="flex-col items-center px-4 mb-5">
            <View className="flex-row gap-3 items-start rounded-lg border-4 border-black-100 bg-black-250">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[65px] h-[65px] justify-center items-center p-0.5">
                        <Image
                            source={{uri: avatar}}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-accent-200 font-psemibold text-sm" numberOfLines={1}>
                            {username}
                        </Text>
                    </View>
                </View>
                <View className="pt-5 pr-5">
                    <Text className="text-3xl text-accent-200">
                        {point}
                    </Text>
                </View>
                <View className="pt-1 pr-2 flex justify-center flex-col">
                    <TouchableOpacity
                        onPress={() => add()}
                    >
                        <Image
                            source={icons.add}
                            className="w-8 h-8"
                            resizemode='contain'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => take()}
                    >
                        <Image
                            source={icons.minus}
                            className="w-8 h-8"
                            resizemode='contain'
                        />
                    </TouchableOpacity>
                </View>
                <View className="pt-5 pr-5">
                    <Image
                        source={icons.menu}
                        className="w-2 h-8"
                        resizemode='contain'
                    />
                </View>
            </View>
        </View>
    );
};
export default GameCardById