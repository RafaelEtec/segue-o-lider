import {View, Text, ScrollView, Image} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import images from '@/constants/images';
import FormField from "../../components/FormField";
import CustomButton from '../../components/CustomButton'
import {Link} from "expo-router"

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {

    };

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <Image
                        source={images.logo_bg_dark}
                        className="w-[140px] h-[140px]"
                        resizeMode="contain"
                    />
                    <Text className="text-3xl text-accent-200 text-semibold mt-10 font-psemibold">Cadastre-se</Text>

                    <FormField
                        title="Usuário"
                        value={form.username}
                        handleChangeText={(e) => setForm({
                            ...form,
                            username: e})}
                        otherStyles="mt-7"
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        placeholder="segueolider@gmail.com"
                        handleChangeText={(e) => setForm({
                            ...form,
                            email: e})}
                        otherStyles="mt-7"
                        keyboardType="email-adrress"
                    />
                    <FormField
                        title="Senha"
                        value={form.password}
                        handleChangeText={(e) => setForm({
                            ...form,
                            password: e})}
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title="Cadastrar"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-accent-200 font-pregular">
                            Já tem uma conta?
                        </Text>
                        <Link href="/sign-in" className="text-lg font-psemibold text-primary-300">Entrar</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SignUp
