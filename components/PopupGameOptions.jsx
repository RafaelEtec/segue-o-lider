import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from "react-native-popup-menu";
import {Alert, Image, Text} from "react-native";
import icons from "../constants/icons";
import React, {useState} from "react";
import {setVisibilityAsync} from "expo-navigation-bar";
import {showMessage} from "react-native-flash-message";
import {renderers} from "react-native-popup-menu";
import {router} from "expo-router";
import {deleteGameById} from "../lib/appwrite";
const {SlideInMenu} = renderers;
import {useGlobalContext} from "../context/GlobalProvider";

const PopupGameOptions = (
    {
        gameId
    }) => {

    const {setIsLoading} = useGlobalContext();
    const deleteGame = async () => {
        setIsLoading(true);
        await deleteGameById(gameId);
        setIsLoading(false);
        showAlertSuccess("Ok né :/", "Jogo excluído com sucesso")
        router.replace("/home");
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
                onPress: () => deleteGame(),
            },
            {
                text: "Cancelar",
                style: "cancel",
                isPreferred: true
            },
        ]);
    }

    return (
        <Menu renderer={SlideInMenu} onBackdropPress={() => setVisibilityAsync("hidden")}>
            <MenuTrigger>
                <Image source={icons.menu}
                       className="w-8 h-8"
                />
            </MenuTrigger>
            <MenuOptions style={{padding: 10, alignItems: "center"}} optionsContainerStyle={{backgroundColor: "#cdcde0"}}>
                <MenuOption
                    style={{fontSize: 20}}
                    onSelect={() => showAlertConfirmation("Tem certeza?", "Todas as informações serão perdidas")}
                >
                    <Text className="font-psemibold">Excluir jogo</Text>
                </MenuOption>
                <MenuOption>
                    <Text className="font-psemibold">Adicionar Jogador</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
};

export default PopupGameOptions;