import {View, Text, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import {useGlobalContext} from "../../context/GlobalProvider";
import Moment from "moment/moment";
import icons from "../../constants/icons";
import FriendCard from "../../components/FriendCard";
import CustomButton from "../../components/CustomButton";

const Create = () => {
    const {user, setUser, setIsLoggedIn} = useGlobalContext();

    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
        title: null,
        thumbmail: null,
        creator: user.$id,
        dateCreated: Moment().format('L')
    });

    const submit = () => {
        console.log(uploading)
    }

    const addParticipant = (friend) => {
        console.log("Selected: " + friend.id);
    }

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <FlatList
                data={[{id: 1, name: "Juão"}, {id: 2, name: "Karina"}, {id: 3, name: "Maicon"}, {id: 4, name: "Maria"}, {id: 5, name: "Jéssica"}, {id: 6, name: "Erik"}, {id: 7, name:"Jhon"}]}
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
                            handleChange={(e) => setForm({...form, title: e})}
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
                        </View>
                    </ScrollView>
                )}
            />
            <View className="px-4 my-4">
                <CustomButton
                    title="Criar"
                    handlePress={submit}
                    isLoading={uploading}
                />
            </View>
        </SafeAreaView>
    )
}
export default Create
