import React, { useEffect, useState } from 'react'
import { Text, View, Button, TouchableOpacity, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import getPlayers from '../utils/getPlayers'

//When we use navigation.navigate() we can only navigate to screens that have been defined in the navigator
// We can pass params: navigation.navigate('User', {id:8})
//You can also think of the route object like a URL. Params shouldn't contain data that you think should not be in the URL

const Home = ({ navigation }) => {
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
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'violet' }}>
            <FlatList
                data={players}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <Text>Home Screen</Text>
            <Button
                color='green'
                title="Go to User Screen"
                onPress={() => navigation.navigate('User')}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('User', { id: 8 })}
            >
                <Text>
                    It's a kind of Magic
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
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