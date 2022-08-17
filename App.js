import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home'
import User from './screens/User'
// NavigationContainer is a component which manages our navigation tree and contains the navigation state. 
// This component must wrap all navigators structure. Usually, we'd render this component at the root of our app.

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='User' component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
