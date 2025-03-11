import {View, Text, FlatList, Image, RefreshControl, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {router, useLocalSearchParams} from "expo-router";
import useAppwrite from "../../lib/useAppwrite";
import {getGameById, getParticipantsByGameId, isCreator} from "../../lib/appwrite";
import {SafeAreaView} from "react-native-safe-area-context";
import GameCardById from "../../components/GameCardById";
import images from '@/constants/images';
import Moment from "moment/moment";
import PopupGameOptions from "../../components/PopupGameOptions";
import {useGlobalContext} from "../../context/GlobalProvider";

const Game = () => {
    const {user, isLoading, setIsLoading} = useGlobalContext();
    const {gameId} = useLocalSearchParams();
    const {data: game} = useAppwrite(() => getGameById(gameId));
    const {data: creator} = useAppwrite(() => isCreator(user?.$id, gameId));
    const {data: participants, refetch} = useAppwrite(() => getParticipantsByGameId(gameId));

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <FlatList
                data={participants}
                keyExtractor={(item) => item.$id}
                renderItem={({item, index}) => (
                    <GameCardById
                        key={item.$id} place={index} participants={item} partId={item.$id} gameId={gameId}
                        creator={game?.creator?.$id}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                        <View className="flex justify-between items-space-between flex-row mb-6">
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push(`/logs/${gameId}`);
                                    }}
                                >
                                    <Text className="text-2xl font-psemibold text-accent-200">
                                        {game.title}
                                    </Text>
                                </TouchableOpacity>
                                <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                                    {Moment(game.$createdAt).format('DD/MM/YYYY')}
                                </Text>
                            </View>
                            <View className="mt-1.5">
                                { creator ? (
                                    <PopupGameOptions gameId={gameId} />
                                ) : (
                                    <Image
                                        source={images.crown}
                                        className="w-11 h-12"
                                        resizemode='contain'
                                    />
                                )}
                            </View>
                        </View>
                        <Image
                            source={{uri: game.thumbnail}}
                            className="w-full h-60 rounded-lg"
                            resizeMode="cover"
                        />
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
            />
        </SafeAreaView>
    );
}
export default Game
