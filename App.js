import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import DictionaryScreen from './src/screens/DictionaryScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dictionary" component={DictionaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
