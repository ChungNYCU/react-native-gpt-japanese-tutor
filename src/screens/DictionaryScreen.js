import { useState } from 'react'
import { Keyboard, ScrollView, Text, TextInput, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import Button from '../components/Button'
import i18n from '../locales/i18n'
import JapaneseSentenceDetails from '../components/JapaneseSentenceDetails'
import JapaneseVocabularyDetails from '../components/JapaneseVocabularyDetails'
import { locales } from '../locales/locales'
import OpenAIAdapter from '../utils/OpenAIAdapter'

import dictionaryScreenStyles from '../styles/DictionaryScreenStyle'

const styles = dictionaryScreenStyles
const openai = new OpenAIAdapter(process.env.EXPO_PUBLIC_OPENAI_API_KEY)
const inputType = {
  vocabulary: '1',
  sentence: '2',
  other: '3',
}

const DictionaryScreen = ({ navigation: { goBack } }) => {
  const [userInput, setUserInput] = useState('')
  const [apiResult, setApiResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const drillDown = (s) => {
    setUserInput(s)
  }
  const handleApiQuery = async () => {
    if (!userInput) {
      return
    }

    Keyboard.dismiss()
    setIsLoading(true)

    let result
    let type

    try {
      type = await openai.getInputType(userInput)
    } catch (error) {
      console.log('Cannot get the type of userInput', error)
      type = inputType.other
    }

    try {
      if (type === inputType.vocabulary) {
        console.log('Vocabulary')
        result = JSON.parse(await openai.getVocabularyDetails(userInput))
      } else if (type === inputType.sentence) {
        console.log('Sentence')
        result = JSON.parse(await openai.getSentenceDetails(userInput))
      } else {
        console.log('UserInput type ambiguous')
        result = JSON.parse(await openai.getSentenceDetails(userInput))
      }
      setApiResult(result)
    } catch (error) {
      setApiResult('Error calling API:' + error)
      console.log(error, result)
    } finally {
      setIsLoading(false)
      setUserInput('')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <ScrollView nestedScrollEnabled={true}>
          {isLoading ? (
            <Text>{i18n.t(locales.loading)}</Text>
          ) : apiResult?.type == 1 ? (
            <JapaneseVocabularyDetails vocabularyData={apiResult} drillDown={drillDown} />
          ) : (
            <JapaneseSentenceDetails sentenceData={apiResult} drillDown={drillDown} />
          )}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={i18n.t(locales.inputPlaceHolder)}
          onChangeText={(text) => setUserInput(text)}
          value={userInput}
        />

        <Button style={styles.queryButton} onPress={handleApiQuery}>
          <Entypo name="arrow-bold-right" size={24} color="black" />
        </Button>
      </View>
    </View>
  )
}

export default DictionaryScreen
