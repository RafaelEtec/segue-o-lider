import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from "react-native-popup-menu";
import {Alert, Image, Text} from "react-native";
import icons from "../constants/icons";
import React from "react";
import {setVisibilityAsync} from "expo-navigation-bar";
import {showMessage} from "react-native-flash-message";
import {unFriendById} from "../lib/appwrite";

const PopupFriendsOptions = (
    {
        userId: userId,
        friendId: friendId
    }) => {

    const unFriend = async() => {
        const result = await unFriendById(userId, friendId);
        if (!result) return showAlertDefault("Opa :/", "Não foi possível desfazer a amizade");
        showAlertSuccess("Boa", "Amizade desfeita")
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
    const showAlertConfirmation = (title, description) => {
        Alert.alert(title, description, [
            {
                text: "Sim",
                onPress: unFriend
            },
            {
                text: "Cancelar",
                style: "cancel",
                isPreferred: true
            },
        ]);
    }

    return (
        <Menu onBackdropPress={() => setVisibilityAsync("hidden")}>
            <MenuTrigger>
                <Image source={icons.menu}
                       className="w-8 h-8 mt-4"
                />
            </MenuTrigger>
            <MenuOptions>
                <MenuOption
                    onSelect={() => showAlertConfirmation("Tem certeza?", "Desfazer amizade")}
                    text="Desfazer amizade"
                >
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
};

export default PopupFriendsOptions;