import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import {useGlobalContext} from "../../context/GlobalProvider";
import Moment from "moment/moment";
import icons from "../../constants/icons";
import CustomButton from "../../components/CustomButton";
import useAppwrite from "../../lib/useAppwrite";
import {getFriendsIds} from "../../lib/appwrite";
import FriendCardGame from "../../components/FriendCardGame";
import FriendCardAvatar from "../../components/FriendCardAvatar";

const Create = () => {
    const {user} = useGlobalContext();

    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        thumbmail: null,
        creator: user.$id,
        dateCreated: Moment().format('L'),
    });

    const {data: friendsIds, refetch} = useAppwrite(() => getFriendsIds(user.accountId));
    const showFriends = [];
    for (let i = 0; i < friendsIds.length; i++) {
        if (friendsIds[i].status === "accepted") showFriends.push(
            <TouchableOpacity onPress={() => addParticipant(friendsIds[i])}>
                <FriendCardGame key={i} friend={friendsIds[i]} />
            </TouchableOpacity>
        );
    }

    let participants = [];
    const [showParticipants, setShowParticipants] = useState()
    const addParticipant = (participant) => {
        console.log(participants);
        participants.push(
            <TouchableOpacity>
                <FriendCardAvatar key={participant.accountId2} friend={participant} />
            </TouchableOpacity>
        );
        setShowParticipants(participants);
    }

    const submit = () => {
        console.log(form);
    };

    const [refreshing, setRefreshing] = useState(false);
    const refreshFriends = async () => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }

    const clearParticipants = async () => {
        participants = [];
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
                    <TouchableOpacity>
                        {form.thumbmail ? (
                            <Image
                                source={{uri: form.thumbmail.uri}}
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
                                    Amigos
                                </Text>
                                <TouchableOpacity onPress={() => refreshFriends}>
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
                                    Participantes
                                </Text>
                                <TouchableOpacity onPress={() => clearParticipants}>
                                    <Image
                                        source={icons.deny}
                                        className="w-8 h-8 mt-4"
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                            {showParticipants}
                        </View>
                    </View>


                </View>
            </ScrollView>
            <CustomButton
                title="Criar"
                handleSubmit={submit}
                containerStyles="mb-4 mx-4"
                isLoading={uploading}
            />
        </SafeAreaView>
    )
}
export default Create
