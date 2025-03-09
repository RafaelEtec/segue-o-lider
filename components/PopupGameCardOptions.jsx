import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from "react-native-popup-menu";
import {Image, Text} from "react-native";
import icons from "../constants/icons";
import React from "react";
import {setVisibilityAsync} from "expo-navigation-bar";
import {showMessage} from "react-native-flash-message";
import {removeParticipantFromGame} from "../lib/appwrite";

const PopupGameCardOptions = (
    {
        partId: id
    }) => {

    const removeParticipant = async() => {
        const result = await removeParticipantFromGame(id);
        if (!result) return showAlertDefault("Opa :/", "Não foi possível remover o participante");
        showAlertSuccess("Boa", "Participante removido");
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
        <Menu onBackdropPress={() => setVisibilityAsync("hidden")}>
            <MenuTrigger>
                <Image source={icons.menu}
                       className="w-8 h-8"
                />
            </MenuTrigger>
            <MenuOptions>
                <MenuOption
                    onSelect={removeParticipant}
                    text="Remover participante"
                >
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
};

export default PopupGameCardOptions;