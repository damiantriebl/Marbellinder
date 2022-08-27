import {View, Text, StyleSheet, Image} from 'react-native'
const Contact = ({match}) =>{
    return (
        <View style={styles.card}>
            <Image source={{ uri: match.thumb }} style={styles.image} />           
            <View style={styles.text}>
                <Text style={styles.title}>{match.name}</Text>
                <Text style={styles.subtitle}>{match.age}</Text>
            </View>
        </View>
    )
}
export default Contact;

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width:300,
        height: 200,
        padding: 0,
        borderRadius: 50,
        flex: 1
    },
    text: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#4278ca",
     },
    title: {
        fontSize: 30,
        textAlign: 'center'       ,
        color: 'white'
    },
    subtitle: {
        fontSize: 30,
        textAlign: 'center',
        textAlignVertical: 'bottom',  
        color: 'white'     
    },
    image: {
        width: 150,
        height: 200
    },
  
})