import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
// import { OpenAI } from 'langchain/llms/openai';
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
})
openai.baseURL = 'https://api.openai.com/v1'
openai.buildURL = (path) => `${openai.baseURL}${path}`

const DictionaryScreen = ({ navigation: { goBack } }) => {
  // const { OpenAI } = require("langchain/llms/openai");
  const [userInput, setUserInput] = useState('')
  const [apiResult, setApiResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // TODO: Implement this to call ChatGPT api, or put api related function into separate file
  const handleApiQuery = async () => {
    if (!userInput) {
      return
    }

    setIsLoading(true)

    // TODO: Move utils stuff into separate file
    const prompt = `Generate a JSON representation of the vocabulary: ${userInput}
    {
      "basic": {
        "pronunciation": "[Pronunciation goes here]",
        "type": "[Type goes here]"
      },
      "detail": {
        "definition": "[Definition goes here]",
        "sample sentence": [list me 5 sample sentences by this vocabulary (Sentence pronunciation goes here)],
        "grammatical tense": [
          {"form": "[Form 1]", "variation": "[Variation 1 (Variation1 pronunciation goes here)]"},
          {"form": "[Form 2]", "variation": "[Variation 2 (Variation2 pronunciation goes here)]"},
          {"form": "[Form 3]", "variation": "[Variation 3 (Variation3 pronunciation goes here)]"},
          {"form": "[Form 4]", "variation": "[Variation 4 (Variation4 pronunciation goes here)]"}
        ]
      }
    }`

    try {
      const completion = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: prompt,
        max_tokens: 2000,
        temperature: 0,
      })

      console.log(completion)
      setApiResult(completion.choices[0].text)
    } catch (error) {
      setApiResult('Error calling ChatGPT API:' + error)
      console.error('Error calling ChatGPT API:', error)
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    width: '70%',
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  resultContainer: {
    flex: 10,
  },
  apiResult: {
    marginTop: 10,
    // fontFamily: 'monospace',
  },
})

export default DictionaryScreen
