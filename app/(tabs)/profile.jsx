import {FlatList, Text, TouchableOpacity, View, Image} from 'react-native'
import React from 'react'
import {useGlobalContext} from "../../context/GlobalProvider";
import {getFriendsIds, signOut} from "../../lib/appwrite";
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import GameCard from "../../components/GameCard";
import EmptyState from "../../components/EmptyState";
import icons from "../../constants/icons";
import InfoBox from "../../components/InfoBox";
import useAppwrite from "../../lib/useAppwrite";

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext();

    const {data: friendsIds} = useAppwrite(() => getFriendsIds(user.accountId));
    let friendsTotal = 0;
    for (let i = 0; i < friendsIds.length; i++) {
        if (friendsIds[i].status === "accepted") friendsTotal++;
    }

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false);

        router.replace("/sign-in");
    };

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <FlatList
                data={null}
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
                                className="w-[101%] h-[101%] rounded-lg"
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
                                title="0"
                                subtitle="Jogos"
                                titleStyles="text-xl"
                                containerStyles="mr-10"
                            />
                            <InfoBox
                                title="0"
                                subtitle="Pontos"
                                titleStyles="text-xl"
                                containerStyles="mr-8"

                            />
                            <InfoBox
                                title={friendsTotal}
                                subtitle="Amigos"
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
