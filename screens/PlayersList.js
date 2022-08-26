import React, { useEffect, useState } from 'react'
import { Card, Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import getPlayers from '../utils/getPlayers'
import SwipeGesture from '../Common/swipeGesture';
import updateMatch from '../utils/updateMatch';
//When we use navigation.navigate() we can only navigate to screens that have been defined in the navigator
// We can pass params: navigation.navigate('User', {id:8})
//You can also think of the route object like a URL. Params shouldn't contain data that you think should not be in the URL

const PlayersList = ({ navigation }) => {
    const [players, setPlayers] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(true);

    const updateElementMatch = async (id, selector) => {
        const newMatch = await updateMatch(id, selector)
        if (newMatch.errorMessage) {
            //manage error
            console.log(newMatch.errorMessage)
        }
        const listPlayers = players.filter(player => player.id !== id)
        setPlayers(listPlayers)
    }

    const onSwipePerformed = async (action, id) => {
        console.log("ID", id)
        switch (action) {
            case 'left': {
                await updateElementMatch(id, false)
                console.log('left Swipe performed');
                break;
            }
            case 'right': {
                updateElementMatch(id , true)
                console.log('right Swipe performed');
                break;
            }
            default: {
                console.log('Undeteceted action');
            }
        }
    }

    const getData = async () => {
        const data = await getPlayers()
        if (data.errorMessage) {
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
            <SwipeGesture onSwipePerformed={onSwipePerformed} itemId={item.id}>
                <Text style={styles.name}>{item.name}</Text>
            </SwipeGesture>
        )
    }

    if (!players) {
        return <Text>Cargando</Text>
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'violet', padding: 1 }}>
            <Text>Players</Text>
            <FlatList style={{ width: "100%" }}
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