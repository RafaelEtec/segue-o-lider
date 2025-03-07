import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import {Image, Text} from "react-native";
import icons from "../constants/icons";
import React from "react";

const PopupFriendsOptions = (
    {
        userId: userId,
        friendId: friendId
    }) => {
    console.log(userId);
    console.log(friendId);
    return (
        <MenuProvider>
            <Menu>
                <MenuTrigger
                    customStyles={{
                        triggerWrapper: {
                            left: 20,
                        }
                    }}
                >
                    <Image
                        source={icons.menu}
                        className="w-8 h-8 mt-4 mr-4"
                        resizeMode="contain"
                    />
                </MenuTrigger>
                <MenuOptions
                customStyles={{
                    optionWrapper: {
                        borderRadius: 10,
                    }
                }}
                >
                    <MenuOption onSelect={() => alert(`Save`)} text="Desfazer amizade" />
                </MenuOptions>
            </Menu>
        </MenuProvider>
    );
};

export default PopupFriendsOptions;