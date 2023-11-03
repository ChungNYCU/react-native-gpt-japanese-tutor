import { useRef, useState } from 'react'
import { Keyboard, ScrollView, Text, TextInput, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import 'react-native-get-random-values' // prerequisite for uuid
import { v4 as uuidv4 } from 'uuid'

import AppConfig from '../../config'
import Button from '../components/Button'
import { ChatDAO } from '../utils/chatDAO'
import i18n from '../locales/i18n'
import JapaneseSentenceDetails from '../components/JapaneseSentenceDetails'
import JapaneseVocabularyDetails from '../components/JapaneseVocabularyDetails'
import { locales } from '../locales/locales'
import MessageHolder from '../components/MessageHolder'
import OpenAIAdapter from '../utils/OpenAIAdapter'

import dictionaryScreenStyles from '../styles/DictionaryScreenStyle'

const styles = dictionaryScreenStyles
const openai = new OpenAIAdapter(process.env.EXPO_PUBLIC_OPENAI_API_KEY)

const DictionaryScreen = ({ navigation: { goBack } }) => {
  const scrollViewRef = useRef(null)
  const [chat, setChat] = useState([])
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const drillDown = (s) => {
    setUserInput(s)
  }

  const handleApiQuery = async () => {
    if (!userInput) {
      return
    }
    setChat((msg) => [...msg, <MessageHolder inputText={userInput} />])

    Keyboard.dismiss()
    setIsLoading(true)

    let result
    let type

    try {
      type = await openai.getInputType(userInput)
    } catch (error) {
      console.log('Cannot get the type of userInput', error)
      type = AppConfig.OTHER
    }

    try {
      if (type === AppConfig.VOCABULARY) {
        console.log('Vocabulary')
        result = JSON.parse(await openai.getVocabularyDetails(userInput))
        setChat((msg) => [
          ...msg,
          <JapaneseVocabularyDetails
            vocabularyData={result}
            drillDown={drillDown}
          />,
        ])
      } else if (type === AppConfig.SENTENCE) {
        console.log('Sentence')
        result = JSON.parse(await openai.getSentenceDetails(userInput))
        setChat((msg) => [
          ...msg,
          <JapaneseSentenceDetails
            sentenceData={result}
            drillDown={drillDown}
          />,
        ])
      } else if(type === AppConfig.QUESTION){
        console.log('Question')
        result = JSON.parse(await openai.getQuestionDetails(userInput))
        console.log(result.markdown)
        setChat((msg) => [...msg, <MessageHolder inputText={result.markdown} />])
      }else {
        console.log('UserInput type ambiguous')
        result = JSON.parse(await openai.getSentenceDetails(userInput))
        setChat((msg) => [
          ...msg,
          <JapaneseSentenceDetails
            sentenceData={result}
            drillDown={drillDown}
          />,
        ])
      }
    } catch (error) {
      console.log(error, result)
    } finally {
      const dataToInsert = {
        type: type,
        question: userInput,
        response: JSON.stringify(result),
        dateTime: new Date().toISOString(),
        UUID: uuidv4(),
      }

      let insertId
      await ChatDAO.insertData(dataToInsert)
        .then((result) => {
          console.log('Data inserted successfully', result)
          insertId = result.insertId
        })
        .catch((error) => {
          console.error('Error inserting data:', error)
        })

      setIsLoading(false)
      setUserInput('')
      console.log('Get inserted data')
      console.log(await ChatDAO.getDataById(insertId))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          nestedScrollEnabled={true}
          keyboardDismissMode="on-drag"
        >
          {chat.map((msg, index) => (
            <View style={styles.message} key={index}>
              {msg}
            </View>
          ))}
          {isLoading ? (
            <MessageHolder inputText={i18n.t(locales.loading)} />
          ) : (
            <Text></Text>
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
