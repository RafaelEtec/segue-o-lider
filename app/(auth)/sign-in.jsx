import {View, Text, ScrollView, Image, Alert, Dimensions} from 'react-native'
import React, {useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import images from '../../constants/images';
import FormField from "../../components/FormField";
import CustomButton from '../../components/CustomButton'
import {Link, router} from "expo-router"
import {getCurrentUser, signIn} from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider";

const SignIn = () => {
    const {setUser, setIsLoggedIn} = useGlobalContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert('Opa!', 'Por favor preencha todos os campos');
        }

        setIsSubmitting(true);
        try {
            await signIn(form.email, form.password);
            const result = await getCurrentUser();
            setUser(result);
            setIsLoggedIn(true);

            router.replace("/home");
        } catch (error) {
            Alert.alert('Opa!', error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6"
                      style={{
                          minHeight: Dimensions.get("window").height - 100,
                      }}>
                    <Image
                        source={images.logo_bg_dark}
                        className="w-[140px] h-[140px]"
                        resizeMode="contain"
                    />
                    <Text className="text-3xl text-accent-200 text-semibold mt-10 font-psemibold">Entre com sua conta</Text>

                    <FormField
                        title="Email"
                        value={form.email}
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
                        title="Entrar"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-accent-200 font-pregular">
                            Não tem uma conta?
                        </Text>
                        <Link href="/sign-up" className="text-lg font-psemibold text-primary-300"> Cadastrar</Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default SignIn;