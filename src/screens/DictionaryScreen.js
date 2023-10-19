import React, { useState } from 'react'
import { Keyboard, ScrollView, Text, TextInput, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import i18n from '../locales/i18n'
import Button from '../components/Button'
import JapaneseVocabularyDetails from '../components/JapaneseVocabularyDetails'
import OpenAIAdapter from '../utils/OpenAIAdapter'
import dictionaryScreenStyles from '../styles/DictionaryScreenStyle'

const styles = dictionaryScreenStyles
const openai = new OpenAIAdapter(process.env.EXPO_PUBLIC_OPENAI_API_KEY)

const DictionaryScreen = ({ navigation: { goBack } }) => {
  const [userInput, setUserInput] = useState('')
  const [apiResult, setApiResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleApiQuery = async () => {
    if (!userInput) {
      return
    }

    Keyboard.dismiss()
    setIsLoading(true)

    try {
      const result = JSON.parse(await openai.getVocabularyDetails(userInput))
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
        <ScrollView nestedScrollEnabled={true}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <JapaneseVocabularyDetails vocabularyData={apiResult} />
          )}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('inputPlaceHolder')}
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
