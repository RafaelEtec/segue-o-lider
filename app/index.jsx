import {ScrollView, Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '@/constants/images';

export default function App() {
    return (
        <SafeAreaView className="bg-black-300 h-full">
            <ScrollView contentContainerStyle={{height:'100%'}}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image
                        source={images.logo_min}
                        className="w-[150px] h-[150px]"
                        resizeMode="contain"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}