import {View, Text, FlatList, Image} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import images from '@/constants/images';
import SearchInput from "../../components/SearchInput";
import MyGames from "../../components/MyGames";
import EmptyState from "../../components/EmptyState";

const Home = () => {
    return (
        <View>
            <SafeAreaView className="bg-black-300 h-full">
                <FlatList
                    //data={[{id: 1}, {id: 2}, {id: 3}]}
                    data={[]}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }) => (
                        <Text className="text-3xl text-accent-200">{item.id}</Text>
                    )}
                    ListHeaderComponent={() => (
                        <View className="my-6 px-4 space-y-6">
                            <View className="justify-between items-space-between flex-row mb-6">
                                <View>
                                    <Text className="font-pmedium text-sm text-gray-100">
                                        Olá,
                                    </Text>
                                    <Text className="text-2xl font-psemibold text-accent-200">
                                        Rafael Goulart
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

                            <View className="w-full flex-1 pt-5 pb-8">
                                <Text className="text-gray-100 text-lg font-pregular mb-3">Jogos que você participa</Text>

                                <MyGames posts={[{id: 1}, {id: 2}, {id: 3}] ?? []} />
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <EmptyState
                            title="Nenhum jogo encontrado"
                            subtitle="Você não está participando de nenhum jogo ainda"
                        />
                    )}
                />
            </SafeAreaView>
        </View>
    )
}
export default Home
