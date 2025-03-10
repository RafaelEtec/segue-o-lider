import {View, Text, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import icons from "../constants/icons";
import {addGameLog, addPoint, takePoint} from "../lib/appwrite";
import PopupGameCardOptions from "./PopupGameCardOptions";
import {useGlobalContext} from "../context/GlobalProvider";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const GameCardById = (
    {
        participants: {
            accountId: {
                avatar,
                username,
            },
            points
        },
        partId: id,
        place: isFirst,
        gameId
    }) => {

    const {user} = useGlobalContext();

    const [point, setPoint] = useState(points)
    const add = async () => {
        await addPoint(id, point);
        await addGameLog(gameId, user.$id, "+"+username, point + " => " + (point+1));
        setPoint(point+1);
    }
    const take = async () => {
        await takePoint(id, point);
        await addGameLog(gameId, user.$id, "-"+username, point + " => " + (point-1));
        setPoint(point-1);
    }

    return (
        <View className="flex-col items-center px-4 mb-5">
            <View className={`flex-row gap-3 items-start rounded-lg border-4 ${isFirst === 0 && point !== 0 ? 'border-primary-300' : 'border-black-200'}  bg-black-250`}>
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[65px] h-[65px] justify-center items-center p-0.5">
                        <Image
                            source={{uri: avatar}}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className={`${isFirst === 0 && point !== 0 ? 'text-primary-300' : 'text-accent-200'} ${isFirst === 0 && point !== 0 ? 'text-lg' : 'text-sm'} font-psemibold`} numberOfLines={1}>
                            {username}
                        </Text>
                    </View>
                </View>
                <View className="pt-5 pr-5">
                    <Text className={`text-3xl ${isFirst === 0 && point !== 0 ? 'text-primary-300' : 'text-accent-200'}`}>
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
                            tintColor={`${isFirst === 0 && point !== 0 ? '#FFBA26' : '#fff'}`}
                            resizemode='contain'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => take()}
                    >
                        <Image
                            source={icons.minus}
                            className="w-8 h-8"
                            tintColor={`${isFirst === 0 && point !== 0 ? '#FFBA26' : '#fff'}`}
                            resizemode='contain'
                        />
                    </TouchableOpacity>
                </View>
                <View className="pt-5 pr-5">
                    <PopupGameCardOptions partId={id}/>
                </View>
            </View>
        </View>
    );
};
export default GameCardById