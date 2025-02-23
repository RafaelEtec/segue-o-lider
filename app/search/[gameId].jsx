import {View, Text, FlatList, Image, RefreshControl} from 'react-native'
import React, {useState} from 'react'
import {useLocalSearchParams} from "expo-router";
import useAppwrite from "../../lib/useAppwrite";
import {getGameById, getParticipantsByGameId} from "../../lib/appwrite";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import {SafeAreaView} from "react-native-safe-area-context";
import GameCardById from "../../components/GameCardById";
import images from '@/constants/images';

const Game = () => {
    const {gameId} = useLocalSearchParams();

    const { data: game } = useAppwrite(() => getGameById(gameId));
    const { data: participants } = useAppwrite(() => getParticipantsByGameId(gameId));

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);

        setRefreshing(false);
    }

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <FlatList
                data={participants}
                keyExtractor={(item) => item.$id}
                renderItem={ ({ item }) => (
                    <GameCardById participants={item} />
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                        <View className="flex justify-between items-space-between flex-row mb-6">
                            <View>
                                <Text className="text-2xl font-psemibold text-accent-200">
                                    {gameId}
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
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    )
}
export default Game
