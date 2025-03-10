import {View, Text, FlatList, Image, RefreshControl} from 'react-native'
import React, {useState} from 'react'
import {useLocalSearchParams} from "expo-router";
import useAppwrite from "../../lib/useAppwrite";
import {getGameById, getGameLogs} from "../../lib/appwrite";
import {SafeAreaView} from "react-native-safe-area-context";
import GameCardById from "../../components/GameCardById";
import images from '@/constants/images';
import Moment from "moment/moment";

const GameLog = () => {
    const {gameId} = useLocalSearchParams();
    const { data: game } = useAppwrite(() => getGameById(gameId));

    const { data: logs, refetch } = useAppwrite(() => getGameLogs(gameId));

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <FlatList
                data={logs}
                keyExtractor={(item) => item.$id}
                renderItem={ ({ item }) => (
                    <View className="flex-row flex items-center justify-between px-4 space-y-6 w-full">
                        <Text className="text-gray-100 font-pregular text-sm" numberOfLines={1}>{Moment(item.$createdAt).format('DD/MM/YY')}</Text>
                        <Text className="text-gray-100 font-pregular text-sm" numberOfLines={1}>{item.accountId.username}</Text>
                        <Text className="text-gray-100 font-pregular text-sm" numberOfLines={1}>{item.action}</Text>
                        {item.message !== "" ? (
                            <Text className="text-gray-100 font-pregular text-sm" numberOfLines={1}>{item.message}</Text>
                        ) : (
                            <Text className="text-gray-100 font-pregular text-sm" numberOfLines={1}>- - - - - - - - </Text>
                        )}
                    </View>
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                        <View className="flex justify-between flex-row mb-6">
                            <View>
                                <Text className="text-2xl font-psemibold text-accent-200">
                                    {game.title}
                                </Text>
                                <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                                    {Moment(game.$createdAt).format('DD/MM/YYYY')}
                                </Text>
                            </View>
                            <View className="mt-1.5">
                                <Image
                                    source={images.crown}
                                    className="w-11 h-12"
                                    resizemode='contain'
                                />
                            </View>
                        </View>
                        <Text className="text-2xl font-psemibold text-accent-200">
                            Logs de atividade
                        </Text>

                        <View className="flex-row justify-between mt-8 items-center">
                            <Text className="text-accent-200 font-psemibold">Data</Text>
                            <Text className="text-accent-200 font-psemibold">Usuário</Text>
                            <Text className="text-accent-200 font-psemibold">Ação</Text>
                            <Text className="text-accent-200 font-psemibold">Mensagem</Text>
                        </View>
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    )
}
export default GameLog
