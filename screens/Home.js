import React, { useEffect, useState, useCallback } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import getMatches from '../utils/getMatches'
import { useFocusEffect } from '@react-navigation/native';

//When we use navigation.navigate() we can only navigate to screens that have been defined in the navigator
// We can pass params: navigation.navigate('User', {id:8})
//You can also think of the route object like a URL. Params shouldn't contain data that you think should not be in the URL

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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'violet', padding: 100 }}>
            <Text>My Matches</Text>
            <FlatList
                data={matches}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('PlayersList', { id: 8 })}
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