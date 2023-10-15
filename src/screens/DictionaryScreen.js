import React, { useState } from 'react'
import { Button, Keyboard, Text, TextInput, View } from 'react-native'

import OpenAIAdapter from '../utils/OpenAIAdapter'
import dictionaryScreenStyles from '../styles/DictionaryScreenStyle'

const styles = dictionaryScreenStyles
const openai = new OpenAIAdapter(process.env.EXPO_PUBLIC_OPENAI_API_KEY)

const DictionaryScreen = ({ navigation: { goBack } }) => {
  const [userInput, setUserInput] = useState('')
  const [apiResult, setApiResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleApiQuery = async () => {
    if (!userInput) {
      return
    }

    Keyboard.dismiss()
    setIsLoading(true)

    try {
      const result = await openai.getVocabularyDetails(userInput)
      setApiResult(result)
    } catch (error) {
      setApiResult('Error calling API:' + error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a Japanese vocabulary"
          onChangeText={(text) => setUserInput(text)}
          value={userInput}
        />
        <Button title="Search" onPress={handleApiQuery} />
      </View>

      <View style={styles.resultContainer}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <Text style={styles.apiResult}>{apiResult}</Text>
        )}
      </View>
    </View>
  )
}

export default DictionaryScreen
