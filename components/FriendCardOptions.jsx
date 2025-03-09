import {View, Text, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import icons from "../constants/icons";
import {useGlobalContext} from "../context/GlobalProvider";
import {showMessage} from "react-native-flash-message";
import {acceptFriendRequest, denyFriendRequest, inviteFriendById} from "../lib/appwrite";
import {router} from "expo-router";
import PopupFriendsOptions from "./PopupFriendsOptions";
import {MenuProvider} from "react-native-popup-menu";

const FriendCardOptions = (
    {
        friend: {
            accountId2: {
                $id,
                avatar,
                username,
            },
            status
        }
    }) => {
    const {user} = useGlobalContext();
    const [handleStatus, setHandleStatus] = useState(status)

    const submitAccept = async () => {
        const result = await acceptFriendRequest(user.$id, $id);
        if (!result) return showAlertDefault("Opa :/", "Falha na requisição")
        showAlertSuccess("Boa!", username + " foi adicionado!");
        setHandleStatus("accepted");
    }

    const submitDeny = async () => {
        const result = await denyFriendRequest(user.$id, $id);
        if (!result) return showAlertDefault("Opa :/", "Falha na requisição")
        showAlertDefault("Vish", "Pedido de amizade recusado")
        setHandleStatus("denied");
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
    if (handleStatus === "sent") showStatus = "Aguardando confirmação";
    if (handleStatus === "awaiting response") showStatus = "Adicionar à lista de amigos?";
    if (handleStatus === "denied") showStatus = "Pedido recusado"

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
                { handleStatus === "sent" ?(
                    <></>
                ) : handleStatus === "denied" ? (
                    <></>
                ) : handleStatus === "awaiting response" ? (
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
                ) : handleStatus === "accepted" ?(
                    <>
                        <PopupFriendsOptions userId={user.$id} friendId={$id} />
                    </>
                ) : (
                    <></>
                )}
            </View>
        </View>
    );

}

export default FriendCardOptions;
