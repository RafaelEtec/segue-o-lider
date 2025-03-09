import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {useGlobalContext} from "../../context/GlobalProvider";
import {SafeAreaView} from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import {findUserByEmail, getFriendsIds, inviteFriendById} from "../../lib/appwrite";
import {showMessage} from 'react-native-flash-message';
import FriendCard from "../../components/FriendCard";
import useAppwrite from "../../lib/useAppwrite";
import FriendCardOptions from "../../components/FriendCardOptions";
import icons from "../../constants/icons";
import {MenuProvider} from "react-native-popup-menu";

const Friends = () => {
    const {user} = useGlobalContext();

    const {data: friendsIds, refetch} = useAppwrite(() => getFriendsIds(user.$id));

    const [friend, setFriend] = useState(null)
    const [formNewFriend, setFormNewFriend] = useState({email: '',});
    const findUser = async () => {
        if (formNewFriend.email === "") return;
        if (formNewFriend.email === user.email) return showAlertDefault("Opa :/", "Não é possível adicionar a si mesmo");

        const found = await findUserByEmail(formNewFriend.email);
        if (found === null) return showAlertDefault("Opa :/", "Usuário não encontrado")

        setFriend(found);
        formNewFriend.email = '';
    }

    const submitFriendRequest = async () => {
        const result = await inviteFriendById(user, friend);
        if (!result) return showAlertDefault("Opa :/", "Não foi possível convidar o usuário")
        showAlertSuccess("Boa!", "O pedido foi enviado")
    }

    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    const showAlertDefault = (title, description) => {
        clearFields();
        showMessage({
            message: title,
            description: description,
            type: "default",
        })
    }
    const showAlertSuccess = (title, description) => {
        clearFields();
        showMessage({
            message: title,
            description: description,
            type: "success",
        })
    }

    const clearFields = () => {
        onRefresh();
        setFriend(null);
        formNewFriend.email = '';
    }

    return (
        <MenuProvider>
            <SafeAreaView className="bg-black-300 h-full">
                <ScrollView className="px-4 my-6">
                    <Text className="text-2xl text-accent-200 font-psemibold">
                        Adicione Amigos
                    </Text>

                    <FormField
                        title="Convide-o pelo seu E-mail"
                        value={formNewFriend.email}
                        placeholder="fulano@gmail.com"
                        handleChangeText={(e) => setFormNewFriend({...formNewFriend, email: e})}
                        otherStyles="mt-10 mb-4"
                        onEndEditing={findUser}
                    />

                    <View className="w-full h-20 bg-black-250 rounded-2xl items-center justify-center">
                    {friend !== null ? (
                        <FriendCard friend={friend} />
                    ) : (
                        <Text className="text-gray-100 font-pmedium">Encontre um amigo</Text>
                    )}
                    </View>
                    {friend !== null ? (
                        <CustomButton
                            title="Convidar"
                            handlePress={submitFriendRequest}
                            containerStyles="mt-2"
                        />
                    ) : (<></>)}

                    <View className="my-6">
                        <View className="flex-row w-full justify-between">
                            <Text className="text-gray-100 font-pmedium">Lista de Amigos</Text>
                            <TouchableOpacity onPress={onRefresh}>
                                <Image
                                    source={icons.refresh}
                                    className="w-8 h-8 mt-4"
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>

                            {friendsIds.map((friend, f_index) => {
                                return (
                                    <FriendCardOptions key={friendsIds[f_index].$id} friend={friend} />
                                )
                            })}

                    </View>

                </ScrollView>
            </SafeAreaView>
        </MenuProvider>
    )
}
export default Friends