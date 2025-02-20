import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import React, {useState} from 'react'
import images from '@/constants/images';
import icons from "../constants/icons";

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-accent-200 font-pmedium">
                {title}
            </Text>
            <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-250 rounded-2xl focus:border-primary-300 items-center flex flex-row">
                <TextInput
                    className="flex-1 text-accent-200 font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#666876"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    {...props}
                />

                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};
export default FormField
