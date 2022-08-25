import React, { useState, useCallback } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import getMatches from '../utils/getMatches'

const Home = ({ navigation }) => {
    const [matches, setMatches] = useState([])
    const [error, setError] = useState('')

    const getData = async () => {
        const data = await getMatches()
        if (data.errorMessage) {
            //do something to show an error message
            setError(data.errorMessage)
        }
        setMatches(data);
    }

    useFocusEffect(
        useCallback(() => {
            getData();
        }, [])
    );

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
                data={matches}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('PlayersList')}
            >
                <Text>
                    It's a kind of Magic
                </Text>
            </TouchableOpacity>
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

export default Home