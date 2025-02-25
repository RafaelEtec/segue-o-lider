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

    }

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <FlatList
                data={null}
                keyExtractor={(item) => item.$id}
                renderItem={ ({ item }) => (
                    <Text>Nothing</Text>
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
                        </View>

                        <Text className="text-base text-gray-100 font-pmedium">
                            Adicione Amigos ao Jogo
                        </Text>
                    </ScrollView>
                )}
                ListFooterComponent={() => (
                    <CustomButton
                        title="Criar"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={uploading}
                    />
                )}
            />
        </SafeAreaView>
    )
}
export default Create
