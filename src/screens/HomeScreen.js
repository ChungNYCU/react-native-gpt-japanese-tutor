import { Button, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const HomeScreen = ({ navigation }) => {
  const navigateToDictionaryScreen = () => {
    navigation.navigate('Dictionary')
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to GPT Tutor!</Text>
      <Button title="Dictionary" onPress={navigateToDictionaryScreen}></Button>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HomeScreen
