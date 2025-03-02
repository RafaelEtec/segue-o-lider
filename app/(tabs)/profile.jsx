import {FlatList, Text, TouchableOpacity, View, Image, RefreshControl} from 'react-native'
import React, {useState} from 'react'
import {useGlobalContext} from "../../context/GlobalProvider";
import {changeUserAvatar, getFriendsIds, getMyGames, signOut} from "../../lib/appwrite";
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import GameCard from "../../components/GameCard";
import EmptyState from "../../components/EmptyState";
import icons from "../../constants/icons";
import InfoBox from "../../components/InfoBox";
import useAppwrite from "../../lib/useAppwrite";
import * as ImagePicker from "expo-image-picker";
import {showMessage} from "react-native-flash-message";

const Profile = () => {
    const {user} = useGlobalContext();

    const {data: friendsIds} = useAppwrite(() => getFriendsIds(user.$id));
    let friendsTotal = 0;
    for (let i = 0; i < friendsIds.length; i++) {
        if (friendsIds[i].status === "accepted") friendsTotal++;
    }

    const {data: myGames, refetch} = useAppwrite(() => getMyGames(user.$id));

    const openPicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            await changeAvatar(result.assets[0]);

        }
    }

    const [uploading, setUploading] = useState(false);
    const changeAvatar = async (avatar) => {
        setUploading(true);
        try {
            await changeUserAvatar(user, avatar);

            showAlertSuccess("Boa!", "Avatar alterado com sucesso");
            router.push('/profile');
        } catch (error) {
            showAlertDefault("Opa :/", error.message);
        } finally {
            setUploading(false);
        }
    }

    const showAlertDefault = (title, description) => {
        showMessage({
            message: title,
            description: description,
            type: "default",
        })
    }
    const showAlertSuccess = (title, description) => {
        showMessage({
            message: title,
            description: description,
            type: "success",
        })
    }

    const logout = async () => {
        await signOut();
        setUser(null);
        setIsLoggedIn(false);

        router.replace("/sign-in");
    };

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }

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

                        <TouchableOpacity
                            onPress={() => openPicker()}
                        >
                            <View className="w-16 h-16 border border-primary-300 rounded-lg flex justify-center items-center">
                                    <Image
                                        source={{ uri: user?.avatar }}
                                        className="w-[101%] h-[101%] rounded-lg"
                                        resizeMode="cover"
                                    />
                            </View>
                        </TouchableOpacity>

                        <InfoBox
                            title={user?.username}
                            containerStyles="mt-5"
                            titleStyles="text-lg"
                        />

                        <View className="mt-5 flex flex-row">
                            <TouchableOpacity
                                onPress={() => router.push('/home')}
                            >
                                <InfoBox
                                    title="0"
                                    subtitle="Jogos"
                                    titleStyles="text-xl"
                                    containerStyles="mr-10"
                                />
                            </TouchableOpacity>
                            <InfoBox
                                title="0"
                                subtitle="Pontos"
                                titleStyles="text-xl"
                                containerStyles="mr-8"

                            />
                            <TouchableOpacity
                                onPress={() => router.push('/friends')}
                            >
                                <InfoBox
                                    title={friendsTotal}
                                    subtitle="Amigos"
                                    titleStyles="text-xl"
                                />
                            </TouchableOpacity>
                        </View>
                        <View className="w-full flex-1 mt-4 pt-4 pb-2 border-t-2 border-t-black-250">
                            <Text className="text-gray-100 text-lg font-pregular">
                                Jogos criados por você
                            </Text>
                        </View>
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    )
}
export default Profile
