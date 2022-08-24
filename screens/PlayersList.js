import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import getPlayers from '../utils/getPlayers'

const PlayersList = ({ navigation, route }) => {
    const [players, setPlayers] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(true);

    const getData = async () => {
        const data = await getPlayers()
        if (data.errorMessage) {
            console.log("WWWW", data)
            //do something to show an error message
            setError(data.errorMessage)
        }
        setPlayers(data);
    }

    useEffect(() => {
        getData();
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.name}>{item.name}</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 50 }}>
            <FlatList
                data={players}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 200
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    name: {
        fontSize: 32,
    },
});

export default PlayersList