import { Button, StyleSheet, Text, View } from 'react-native'
import HomeScreenStyle from '../styles/HomeScreenStyle'

const HomeScreen = ({ navigation }) => {
  const styles = HomeScreenStyle

  const navigateToDictionaryScreen = () => {
    navigation.navigate('Dictionary')
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to GPT Tutor!</Text>
      <Button title="Dictionary" onPress={navigateToDictionaryScreen}></Button>
    </View>
  )
}

export default HomeScreen
