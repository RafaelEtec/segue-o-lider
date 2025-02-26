import {View, Text, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import {useGlobalContext} from "../../context/GlobalProvider";
import Moment from "moment/moment";
import icons from "../../constants/icons";
import FriendCard from "../../components/FriendCard";
import CustomButton from "../../components/CustomButton";
import EmptyState from "../../components/EmptyState";
import EmptyStateFriends from "../../components/EmptyStateFriends";

const Create = () => {
    const {user} = useGlobalContext();

    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        thumbmail: null,
        creator: user.$id,
        dateCreated: Moment().format('L'),
    });

    const [participants, setParticipants] = useState(false);

    const submit = () => {
        console.log(form)
    };

    const addParticipant = (friend) => {
        console.log("Selected: " + friend.id);
    };

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <FlatList
                data={null}
                keyExtractor={(item) => item.$id}
                renderItem={ ({ item }) => (
                    <TouchableOpacity onPress={() => addParticipant(item)}>
                        <FriendCard
                            friend={item}
                        />
                    </TouchableOpacity>
                )}
                ListHeaderComponent={() => (
                    <ScrollView className="px-4 my-6">
                        <Text className="text-2xl text-accent-200 font-psemibold">
                            Crie um Jogo
                        </Text>

                        <FormField
                            title="Título"
                            value={form.title}
                            onEndEditing={(e) => form.title = e}
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

                            <Text className="mt-6 text-base text-gray-100 font-pmedium">
                                Participantes
                            </Text>
                            <View className="w-full h-fit bg-black-250">

                            </View>
                        </View>
                    </ScrollView>
                )}
                ListEmptyComponent={() => (
                    <EmptyStateFriends
                        title="Nenhum amigo encontrado"
                        subtitle="Convide a galera e descubra o melhor!"
                    />
                )}
            />
                {participants !== null ? (
                    <View className="px-4 my-4">
                            <CustomButton
                                title="Criar"
                                handlePress={submit}
                                isLoading={uploading}
                            />
                    </View>
                ) : (
                    <>
                    </>
                )}
        </SafeAreaView>
    )
}
export default Create
