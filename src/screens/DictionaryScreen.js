import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

const DictionaryScreen = ({ navigation: { goBack } }) => {
  const [userInput, setUserInput] = useState('')
  const [apiResult, setApiResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  // TODO: Implement this to call ChatGPT api, or put api related function into separate file
  const handleApiQuery = async () => {
    if (!userInput) {
      return
    }

    setIsLoading(true)

    try {
      await sleep(2000)
      // const response = await fetch(`YOUR_API_ENDPOINT/${userInput}`)
      // if (response.ok) {
      //   const data = await response.json()
      //   setApiResult(JSON.stringify(data, null, 2))
      // } else {
      //   setApiResult('API Error: Unable to fetch data.')
      // }
    } catch (error) {
      setApiResult('Network Error: Unable to fetch data.')
    } finally {
      setApiResult(`This is result from ChatGPT about ${userInput}.`)
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Button onPress={() => goBack()} title="Go back to Home screen" />

      <Text>API URL: {process.env.EXPO_PUBLIC_API_URL}</Text>
      <Text>API KEY: {process.env.EXPO_PUBLIC_API_KEY}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter something to call ChatGPT api"
        onChangeText={(text) => setUserInput(text)}
        value={userInput}
      />

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Text style={styles.apiResult}>{apiResult}</Text>
      )}

      <Button title="Search" onPress={handleApiQuery} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  apiResult: {
    marginTop: 10,
    // fontFamily: 'monospace',
  },
})

export default DictionaryScreen
