import {View, Text, ScrollView, Image} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import images from '@/constants/images';
import FormField from "../../components/FormField";

const SignIn = () => {
    return (
        <SafeAreaView className="bg-black-300 h-full">
            <ScrollView>
                <View className="w-full justify-center h-full px-4 my-6">
                    <Image
                        source={images.logo_bg_dark}
                        className="w-[140px] h-[140px]"
                        resizeMode="contain"
                    />
                    <Text className="text-3xl text-accent-200 text-semibold mt-10 font-psemibold">Entre com sua conta</Text>

                    <FormField
                        title="Email"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SignIn
