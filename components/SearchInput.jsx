import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import React, {useState} from 'react'
import icons from "../constants/icons";

const SearchInput = ({
                       title,
                       value,
                       placeholder,
                       handleChangeText,
                       otherStyles,
                       ...props
                   }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-250 rounded-2xl focus:border-accent-200 items-center flex-row space-x-4">
            <TextInput
                className="text-base mt-0.5 text-accent-200 flex-1 font-pregular"
                value={value}
                placeholder="Procure por um jogo"
                placeholderTextColor="#666876"
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Senha' && !showPassword}
                {...props}
            />

            <TouchableOpacity>
                <Image
                    source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    );
};
export default SearchInput
