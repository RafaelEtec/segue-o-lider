import {View, Text, FlatList} from 'react-native'
import React from 'react'

const MyGames = ({posts}) => {
    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <Text className="text-3xl text-accent-200">{item.id}</Text>
            )}
            horizontal
        />
    )
}
export default MyGames