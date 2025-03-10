import {View, Text, FlatList, Image, RefreshControl, ScrollView} from 'react-native'
import React, {useState} from 'react'
import {useLocalSearchParams} from "expo-router";
import useAppwrite from "../../lib/useAppwrite";
import {getGameById, getGameLogs} from "../../lib/appwrite";
import {SafeAreaView} from "react-native-safe-area-context";
import images from '@/constants/images';
import Moment from "moment/moment";
import {Table, TableWrapper, Row, Rows} from 'react-native-reanimated-table';

const GameLog = () => {
    const {gameId} = useLocalSearchParams();
    const {data: game} = useAppwrite(() => getGameById(gameId));

    const {data: logs, refetch} = useAppwrite(() => getGameLogs(gameId));
    const newLogs = logs.map(item => {
        const container = [];
        container[0] = Moment(item.$createdAt).format('DD/MM/YY');
        container[1] = item.accountId.username;
        container[2] = item.action;
        container[3] = item.message;
        return container;
    });
    const tableHeader = ['Data', 'Usuário', 'Ação', 'Mensagem'];

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }

    return (
        <SafeAreaView className="bg-black-300 h-full">
            <ScrollView>
                <View className="flex my-6 px-4 space-y-6">
                    <View className="flex justify-between flex-row mb-6">
                        <View>
                            <Text className="text-2xl font-psemibold text-accent-200">
                                {game.title}
                            </Text>
                            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
                                {Moment(game.$createdAt).format('DD/MM/YYYY')}
                            </Text>
                        </View>
                        <View className="mt-1.5">
                            <Image
                                source={images.crown}
                                className="w-11 h-12"
                                resizemode='contain'
                            />
                        </View>
                    </View>
                    <Text className="text-2xl font-psemibold text-accent-200">
                        Logs de atividade
                    </Text>

                    <View className="w-full px-2">
                        <Table>
                            <Row data={tableHeader} style={{height:'40'}} textStyle={{color: '#CDCDE0', fontFamily: 'monospace', textAlign: 'center'}}/>
                            <TableWrapper>
                                <Rows data={newLogs} textStyle={{color: '#CDCDE0', fontFamily: 'monospace', textAlign: 'center'}}/>
                            </TableWrapper>
                        </Table>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default GameLog
