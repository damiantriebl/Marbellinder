import { Text, View,Image , StyleSheet } from 'react-native'

const Card = ({item}) => {
    return(
        <View style={styles.card}>
            <Image source={{ uri: item.thumb }} style={{ width: 320, height: 500,  }} />           
            <Text style={styles.text}>{item.name}</Text>
        </View>
    )

}
export default Card;

const styles = StyleSheet.create({
    card: {
        overflow: 'visible',
        justifyContent: 'center',

    },
    text: {
        fontSize: 30,
        textAlign: 'center'
    },
    player: {

    }
})