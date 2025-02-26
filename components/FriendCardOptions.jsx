import {View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import icons from "../constants/icons";
import {useGlobalContext} from "../context/GlobalProvider";
import {showMessage} from "react-native-flash-message";
import {acceptFriendRequest, inviteFriendById} from "../lib/appwrite";
import {router} from "expo-router";

const FriendCardOptions = (
    {
        friend: {
            accountId2,
            avatar,
            username,
            status
        }
    }) => {
    const {user} = useGlobalContext();

    const submitAccept = async () => {
        const result = await acceptFriendRequest(user.accountId, accountId2);
        if (!result) return showAlertDefault("Opa :/", "Falha na requisição")
        showAlertSuccess("Boa!", username + " foi adicionado!");
        router.push();
    }

    const submitDeny = async () => {

        showAlertDefault("Vish", "Pedido de amizade recusado")
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

    let showStatus = "";
    if (status === "sent") showStatus = "Aguardando confirmação";
    if (status === "awaiting response") showStatus = "Adicionar à lista de amigos?";

    return (
        <View className="w-full h-16 flex-row mt-4">
            <Image
                source={{uri: avatar}}
                className="w-16 h-16 rounded-lg"
                resizeMode="cover"
            />
            <View className="flex-1 items-start justify-start">
                <Text className="text-2xl text-accent-200 font-psemibold ml-2 mt-3.5" numberOfLines={1}>
                    {username}
                </Text>
                <Text className="text-sm text-gray-100 font-psemibold ml-2" numberOfLines={1}>
                    {showStatus}
                </Text>
            </View>
            <View>
                { status === "sent" ?(
                    <></>
                ) :status === "awaiting response" ? (
                    <>
                        <TouchableOpacity
                            onPress={submitAccept}
                        >
                            <Image
                                source={icons.accept}
                                className="w-8 h-8"
                                tintColor="#00AA00"
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={submitDeny}
                        >
                            <Image
                                source={icons.deny}
                                className="w-8 h-8"
                                tintColor="#AA0000"
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Image
                            source={icons.menu}
                            className="w-8 h-8 mt-4"
                            resizeMode="contain"
                        />
                    </>
                )}



            </View>
        </View>
    );

}

export default FriendCardOptions;
