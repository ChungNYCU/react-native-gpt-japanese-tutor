import { Button, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const DictionaryScreen = ({ navigation }) => {
  const navigateToHomeScreen = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to Dictionary!</Text>
      <Button title="Home" onPress={navigateToHomeScreen}></Button>
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

export default DictionaryScreen
