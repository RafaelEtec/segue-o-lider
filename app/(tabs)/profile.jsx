import {FlatList, Text, TouchableOpacity, View, Image} from 'react-native'
import React, {useState} from 'react'
import {useGlobalContext} from "../../context/GlobalProvider";
import useAppwrite from "../../lib/useAppwrite";
import {getMyGames, getTotalPointsByUserId, signOut} from "../../lib/appwrite";
import {router} from "expo-router";
import GameCard from "../../components/GameCard";
import icons from "../../constants/icons";
import {SafeAreaView} from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
    const {user, setUser, setIsLoggedIn} = useGlobalContext();
    const {data: myGames} = useAppwrite(() => getMyGames(user.$id));

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false);

        router.replace("/sign-in");
    };
    return (
        <SafeAreaView className="bg-black-300 h-full">
            <FlatList
                data={myGames}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <GameCard game={item}/>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="Nenhum jogo encontrado"
                        subtitle="Você não está participando de nenhum jogo ainda"
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
                        <TouchableOpacity
                            onPress={logout}
                            className="flex w-full items-end mb-10"
                        >
                            <Image
                                source={icons.logout}
                                resizeMode="contain"
                                className="w-6 h-6"
                            />
                        </TouchableOpacity>

                        <View className="w-16 h-16 border border-primary-300 rounded-lg flex justify-center items-center">
                            <Image
                                source={{ uri: user?.avatar }}
                                className="w-[90%] h-[90%] rounded-lg"
                                resizeMode="cover"
                            />
                        </View>

                        <InfoBox
                            title={user?.username}
                            containerStyles="mt-5"
                            titleStyles="text-lg"
                        />

                        <View className="mt-5 flex flex-row">
                            <InfoBox
                                title={myGames.length || 0}
                                subtitle="Jogos"
                                titleStyles="text-xl"
                                containerStyles="mr-10"
                            />
                            <InfoBox
                                title="21"
                                subtitle="Pontos"
                                titleStyles="text-xl"
                            />
                        </View>
                        <View className="w-full flex-1 mt-4 pt-4 pb-2 border-t-2 border-t-black-250">
                            <Text className="text-gray-100 text-lg font-pregular">
                                Jogos criados por você
                            </Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}
export default Profile
