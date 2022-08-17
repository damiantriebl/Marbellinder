import React from 'react'
import { Text, View } from 'react-native'

const User = ({ route }) => {
    console.log("route", route.params)
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>
                This is the User
            </Text>
        </View>
    )
}

export default User