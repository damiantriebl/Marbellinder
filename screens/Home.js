import React, { useEffect, useState } from 'react'
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native'

//When we use navigation.navigate() we can only navigate to screens that have been defined in the navigator
// We can pass params: navigation.navigate('User', {id:8})
//You can also think of the route object like a URL. Params shouldn't contain data that you think should not be in the URL

const Home = ({ navigation }) => {
    const [players, setPlayers] = useState([])
    const [isLoading, setLoading] = useState(true);
  
    const getPlayers = async () => {
       try {
        const response = await fetch('http://localhost:3000/players');
        const json = await response.json();
        console.log(json)
        setPlayers(json);
      } catch (error) {
        console.error('Dtcon - error',error);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
      getPlayers();
    }, []);   

    return (        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'violet' }}>
            {players.map((player)=>{
               return <li>{player.name}</li>
            })}
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
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 200
    }
});

export default Home