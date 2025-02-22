import {ScrollView, Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '@/constants/images';
import CustomButton from "../components/CustomButton";
import {StatusBar} from "expo-status-bar";
import {Redirect, router} from 'expo-router';
import {useGlobalContext} from "../context/GlobalProvider";

export default function App() {

    const {isLoading, isLoggedIn} = useGlobalContext();

    if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <ScrollView contentContainerStyle={{height:'100%'}}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image
                        source={images.logo_bg_dark}
                        className="w-[150px] h-[150px]"
                        resizeMode="contain"
                    />
                    <Image
                        source={images.games}
                        className="w-[280px] h-[280px]"
                        resizeMode="contain"
                    />
                    <Text className="text-3xl font-pbold text-accent-200 mt-7 text-center">
                        Descubra quem é {"\n"}
                        <Text className="text-primary-300">
                            O Melhor Jogador {"\n"}
                        </Text>
                        Entre a galera
                    </Text>
                    <CustomButton
                        title="Continuar"
                        handlePress={() => router.push("/sign-in")}
                        containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#191d31"
            style='light'/>
        </SafeAreaView>
    );
}