import React, { useState } from 'react'
import { Keyboard, Text, TextInput, View, ScrollView } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import Button from '../components/Button'
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
      <View style={styles.resultContainer}>
        <ScrollView>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <Text style={styles.apiResult}>{apiResult}</Text>
          )}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a Japanese vocabulary"
          onChangeText={(text) => setUserInput(text)}
          value={userInput}
        />

        <Button onPress={handleApiQuery}>
          <Entypo name="arrow-bold-right" size={24} color="black" />
        </Button>
      </View>
    </View>
  )
}

export default DictionaryScreen
