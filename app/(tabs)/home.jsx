import {View, Text, FlatList, Image, RefreshControl} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import images from '@/constants/images';
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import {useGlobalContext} from "../../context/GlobalProvider";
import useAppwrite from "../../lib/useAppwrite";
import {getMyGames} from "../../lib/appwrite";
import GameCard from "../../components/GameCard";

const Home = () => {
    const {user, setUser, setIsLoggedIn} = useGlobalContext();
    const {data: myGames, refetch} = useAppwrite(getMyGames(user.$id));

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <FlatList
                data={myGames}
                keyExtractor={(item) => item.$id}
                renderItem={ ({ item }) => (
                    <GameCard game={item} />
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                        <View className="flex justify-between items-space-between flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">
                                    Olá,
                                </Text>
                                <Text className="text-2xl font-psemibold text-accent-200">
                                    {user.username}
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

                        <SearchInput />

                        <View className="w-full flex-1 pt-5">
                            <Text className="text-gray-100 text-lg font-pregular">
                                Suas participações
                            </Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="Nenhum jogo encontrado"
                        subtitle="Você não está participando de nenhum jogo ainda"
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    );
};
export default Home
