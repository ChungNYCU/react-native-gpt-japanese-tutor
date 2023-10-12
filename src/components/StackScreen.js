import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'
import DictionaryScreen from '../screens/DictionaryScreen'

const StackScreen = ({ routeName }) => {
  const Stack = createNativeStackNavigator()

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dictionary" component={DictionaryScreen} />
      </Stack.Navigator>
    </View>
  )
}

export default StackScreen
