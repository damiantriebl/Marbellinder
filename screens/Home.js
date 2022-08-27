import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Contact from '../Common/Contact'
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

    useEffect(() => {
        getData();
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Contact style={styles.name} match={item}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={matches}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('PlayersList')}
            >
                <Text style={styles.buttonText}>
                    It's a kind of Magic
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 10,
        height: window.height
    },
    button: {
        alignItems: "center",
        backgroundColor: "#4278ca",
        padding: 10,
        borderRadius: 10,        
    },
    buttonText: {
        color: "white",
        fontSize: 20
    },
    item: {
        backgroundColor: '#f9c2ff',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    name: {
        fontSize: 32,
    },
});

export default Home