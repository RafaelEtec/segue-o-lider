import {View, Text, Image} from 'react-native';
import React from 'react';
import images from '@/constants/images';
import CustomButton from "./CustomButton";
import {router} from "expo-router";

const EmptyStateFriends = ({title, subtitle}) => {
    return (
        <View className="justify-center items-center px-4">
            <Image
                source={images.empty}
                className="w-[270px] h-[215px]"
                resizeMode="contain"
            />
            <Text className="text-xl text-center font-psemibold text-accent-200 mt-2">
                {title}
            </Text>
            <Text className="font-pmedium text-sm text-gray-100">
                {subtitle}
            </Text>

            <CustomButton
                title="Convidar"
                handlePress={() => router.push('/profile')}
                containerStyles="w-full my-5"
            />
        </View>
    )
}
export default EmptyStateFriends