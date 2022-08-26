import React, { useCallback, useState, useReducer } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import getPlayers from '../utils/getPlayers'
import SwipeGesture from '../Common/swipeGesture';
import updateMatch from '../utils/updateMatch';
//When we use navigation.navigate() we can only navigate to screens that have been defined in the navigator
// We can pass params: navigation.navigate('User', {id:8})
//You can also think of the route object like a URL. Params shouldn't contain data that you think should not be in the URL

const reducer = (state, action) => {
    switch (action.type) {
        case 'remove':
            const listPlayers = state.players.filter(player => player.id !== action.payload)
            return { players: listPlayers }
        case 'add':
            return { players: action.payload }
        default:
            return state
    }
}

const PlayersList = ({ navigation }) => {
    const [state, dispatch] = useReducer(reducer, { players: [] });
    const [error, setError] = useState('')

    const getData = async () => {
        const data = await getPlayers()
        if (data.errorMessage) {
            setError(data.errorMessage)
        }
        dispatch({ type: 'add', payload: data })
    }

    useFocusEffect(
        useCallback(() => {
            getData();
        }, [])
    );

    const updateElementMatch = async (id, selector) => {
        const newMatch = await updateMatch(id, selector)
        if (newMatch.errorMessage) {
            //manage error
            console.log(newMatch.errorMessage)
        }
        dispatch({ type: 'remove', payload: id })
    }

    const onSwipePerformed = async (action, id) => {
        switch (action) {
            case 'left': {
                dispatch({ type: 'remove', payload: id })
                console.log('left Swipe performed');
                break;
            }
            case 'right': {
                updateElementMatch(id, true)
                console.log('right Swipe performed');
                break;
            }
            default: {
                console.log('Undeteceted action');
            }
        }
    }

    const renderItem = ({ item }) => {
        return (
            <SwipeGesture onSwipePerformed={onSwipePerformed} itemId={item.id}>
                <Text style={styles.name}>{item.name}</Text>
            </SwipeGesture>
        )
    }

    if (!state.players.length) {
        return <Text>Cargando</Text>
    }
    return (
        <View style={styles.container}>
            <Text>Players</Text>
            <FlatList style={{ width: "100%" }}
                data={state.players}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Profile')}
            >
                <Text>
                    Profile
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
        backgroundColor: 'violet',
        padding: 50
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 200,
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