import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import DictionaryScreen from '../screens/DictionaryScreen'
import SettingsScreen from '../screens/SettingScreen'

import Header from '../components/Header'
import Button from '../components/Button'

import StackScreenStyle from '../styles/StackScreenStyle'

const StackScreen = ({ routeName }) => {
  const styles = StackScreenStyle
  const Stack = createNativeStackNavigator()
  const navigation = useNavigation()

  const navigateToSettingScreen = () => {
    navigation.navigate('Setting')
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName={routeName}
        screenOptions={{
          header: (props) => <Header />,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dictionary" component={DictionaryScreen} />
        <Stack.Screen name="Setting" component={SettingsScreen} />
      </Stack.Navigator>

      <View style={styles.settingButtomContainer}>
        <Button onPress={navigateToSettingScreen}>
          <Ionicons name="settings-sharp" size={24} color="black" />
        </Button>
      </View>
    </View>
  )
}

export default StackScreen
