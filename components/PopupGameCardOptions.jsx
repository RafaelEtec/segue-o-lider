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
import {addGameLog, removeParticipantFromGame} from "../lib/appwrite";

const PopupGameCardOptions = (
    {
        partId: id
    }) => {

    const removeParticipant = async() => {
        const result = await removeParticipantFromGame(id);
        if (!result) return showAlertDefault("Opa :/", "Não foi possível remover o participante")
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
    const showAlertConfirmation = (title, description) => {
        Alert.alert(title, description, [
            {
                text: "Sim",
                onPress: removeParticipant
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
                       className="w-8 h-8"
                />
            </MenuTrigger>
            <MenuOptions>
                <MenuOption
                    onSelect={() => showAlertConfirmation("Tem certeza?", "Remover participante")}
                    text="Remover participante"
                >
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
};

export default PopupGameCardOptions;