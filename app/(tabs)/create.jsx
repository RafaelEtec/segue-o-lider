import {View, Text, ScrollView, TouchableOpacity, Image, FlatList, Alert} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import {useGlobalContext} from "../../context/GlobalProvider";
import Moment from "moment/moment";
import icons from "../../constants/icons";
import CustomButton from "../../components/CustomButton";
import useAppwrite from "../../lib/useAppwrite";
import {createGame, getFriendsIds, insertParticipants} from "../../lib/appwrite";
import FriendCardGame from "../../components/FriendCardGame";
import FriendCardAvatar from "../../components/FriendCardAvatar";
import * as DocumentPicker from 'expo-document-picker';
import {FlashList} from "@shopify/flash-list";
import {showMessage} from "react-native-flash-message";
import {router} from "expo-router";
import * as ImagePicker from "expo-image-picker";

const Create = () => {
    const {user} = useGlobalContext();
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        thumbnail: null,
        creator: user.$id,
        dateCreated: Moment().format('L'),
        participants: []
    });

    const {data: friendsIds, refetch} = useAppwrite(() => getFriendsIds(user.$id));
    const showFriends = [];
    for (let i = 0; i < friendsIds.length; i++) {
        if (friendsIds[i].status === "accepted") {
            showFriends.push(
                <TouchableOpacity onPress={() => addParticipant(friendsIds[i])}>
                    <FriendCardGame key={friendsIds[i].$id} friend={friendsIds[i]} />
                </TouchableOpacity>
            );
        }
    }

    const [showParticipants, setShowParticipants] = useState([]);
    const addParticipant = async (participant) => {
        if (alreadyParticipant(participant)) return console.log("Participant already");

        form.participants.push(participant);
        setShowParticipants(form.participants);
    }

    const alreadyParticipant = (participant) => {
        for (let i = 0; i < form.participants.length; i++) {
            if (form.participants[i] === participant) {
                return true;
            }
        }
        return false;
    }

    const openPicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect:[4, 3],
            quality: 1
        });

        if (!result.canceled) {
            setForm({
                ...form,
                thumbnail: result.assets[0]
            });
        }
    }

    const submit = async () => {
        setShowParticipants(form.participants);
        if (!form.title || !form.thumbnail || !form.participants.length) {
            return showAlertDefault("Opa :/", "Por favor preencha todos os campos")
        }

        setUploading(true);
        try {
            const game = await createGame({...form});

            await insertParticipants(game, user, form.participants);

            showAlertSuccess("Boa!", "Jogo criado com sucesso")
            router.replace('/home')
        } catch (error) {
            showAlertDefault("Opa :/", error.message);
        } finally {
            setForm({
                title: '',
                thumbnail: null,
                creator: user.$id,
                dateCreated: Moment().format('L'),
                participants: []
            })
            setShowParticipants(form.participants);
            setUploading(false);
        }
    };

    const [refreshing, setRefreshing] = useState(false);
    const refreshFriends = async () => {
        setRefreshing(true);
        await refetch();
        setShowParticipants(form.participants);
        setRefreshing(false);
    }

    const clearParticipants = async () => {
        form.participants = [];
        setShowParticipants([]);
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

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <ScrollView className="px-4 my-6">
                <Text className="text-2xl text-accent-200 font-psemibold">
                    Crie Jogos
                </Text>

                <FormField
                    title="Título"
                    value={form.title}
                    handleChangeText={(e) => setForm({...form, title: e})}
                    otherStyles="mt-10"
                />

                <View className="mt-7 space-y-2">
                    <Text className="text-base text-gray-100 font-pmedium">
                        Imagem de exibição
                    </Text>
                    <TouchableOpacity onPress={() => openPicker()}>
                        {form.thumbnail ? (
                            <Image
                                source={{uri: form.thumbnail.uri}}
                                resizeMode="cover"
                                className="w-full h-60 rounded-2xl"
                            />
                        ) : (
                            <View className="w-full h-40 px-4 bg-black-250 rounded-2xl justify-center items-center">
                                <View className="w-14 h-14 border border-dashed rounded-xl border-primary-300 justify-center items-center">
                                    <Image
                                        source={icons.upload}
                                        className="w-8 h-8"
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>

                    <View className="flex-row justify-between w-full h-full">
                        <View className="flex-1 items-center">
                            <View className="flex-row justify-start w-full">
                                <Text className="mt-6 text-base text-gray-100 font-pmedium">
                                    Friends
                                </Text>
                                <TouchableOpacity onPress={refreshFriends}>
                                    <Image
                                        source={icons.refresh}
                                        className="w-8 h-8 mt-4"
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                            {showFriends}
                        </View>
                        <View className="flex-rol items-center">
                            <View className="flex-row justify-start w-full">
                                <Text className="mt-6 text-base text-gray-100 font-pmedium">
                                    Participants
                                </Text>
                                <TouchableOpacity onPress={clearParticipants}>
                                    <Image
                                        source={icons.deny}
                                        className="w-8 h-8 mt-4"
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View className="w-full h-full flex-col">
                                {form.participants.map((participant, p_index) => {
                                    return (
                                        <TouchableOpacity>
                                            <FriendCardAvatar key={p_index} friend={participant} />
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <CustomButton
                title="Criar"
                handlePress={submit}
                containerStyles="mb-4 mx-4"
                isLoading={uploading}
            />
        </SafeAreaView>
    )
}
export default Create
