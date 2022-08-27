import React, { useCallback, useState, useReducer } from 'react'
import { Text, View, StyleSheet, list, TouchableOpacity, useWindowDimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import getPlayers from '../utils/getPlayers'
import SwipeGesture from '../Common/swipeGesture';
import updateMatch from '../utils/updateMatch';
import Card from '../Common/Card';
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
    const window = useWindowDimensions();



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

    const RenderItem = ({ item }) => {
        return (
            <SwipeGesture onSwipePerformed={onSwipePerformed} itemId={item.id}>
                <Card item={item} />
            </SwipeGesture>
        )
    }

    if (!state.players.length) {
        return (
            <View style={styles.container}>
                <Text style={styles.noMore}>
                    No more elements!</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Text style={styles.buttonText}>
                        Profile
                    </Text>
                </TouchableOpacity>
            </View>)
    }
    return (
        <View style={styles.container}>  
            <View style={styles.list}>
                {state.players.map((player) => {
                    return <RenderItem key={player.id} item={player} />
                })}
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Profile')}
            >
                <Text style={styles.buttonText}>
                    Profile
                </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    noMore: {
        padding: 30,
        color: "#000048",
    },
    list: {
        flex: 1,
    },
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
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    name: {
        fontSize: 32,
    },
});

export default PlayersList