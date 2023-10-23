import { useState } from 'react'
import { Keyboard, ScrollView, Text, TextInput, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import Button from '../components/Button'
import i18n from '../locales/i18n'
import JapaneseVocabularyDetails from '../components/JapaneseVocabularyDetails'
import { locales } from '../locales/locales'
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
      let result
      const type = JSON.parse(await openai.getInputType(userInput))

      if(type.isVocabulary){
        result = JSON.parse(await openai.getVocabularyDetails(userInput))
      }else if(type.isSentence){
        result = await openai.getSentenceDetails(userInput)
      }else{
        result = "Cannot identify user input."
      }

      setApiResult(result)
    } catch (error) {
      setApiResult('Error calling API:' + error)
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
          ) : (
            <JapaneseVocabularyDetails vocabularyData={apiResult} />
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

        <Button onPress={handleApiQuery}>
          <Entypo name="arrow-bold-right" size={24} color="black" />
        </Button>
      </View>
    </View>
  )
}

export default DictionaryScreen
