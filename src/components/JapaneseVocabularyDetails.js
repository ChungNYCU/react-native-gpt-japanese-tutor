import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const JapaneseVocabularyDetails = ({ vocabularyData }) => {
  if (!vocabularyData) return

  const { basic, detail } = vocabularyData

  return (
    <View>
      <Text style={styles.title}>Basic Information:</Text>
      <Text>Vocabulary: {basic.vocabulary}</Text>
      <Text>Type: {basic.type}</Text>
      <Text>Pronunciation (Hiragana): {basic['pronunciation-hiragana']}</Text>
      <Text>Pronunciation (Romaji): {basic['pronunciation-romaji']}</Text>

      <Text style={styles.title}>Detail:</Text>
      <Text>
        Definition: {detail.definition.replace('${language}', 'Your Language')}
      </Text>

      <View>
        <Text style={styles.title}>Sample Sentences:</Text>
        {detail['sample-sentences'].map((item, index) => (
          <View key={index}>
            <Text>Sentence: {item.sentence}</Text>
            <Text>
              Pronunciation (Hiragana): {item['pronunciation-hiragana']}
            </Text>
            <Text>Pronunciation (Romaji): {item['pronunciation-romaji']}</Text>
            <Text>
              Translation:{' '}
              {item.translation.replace('${language}', 'Your Language')}
            </Text>
            <View style={{ height: 1, backgroundColor: 'gray' }} />
          </View>
        ))}
      </View>

      <Text style={styles.title}>Grammatical Tenses:</Text>
      <FlatList
        data={detail['grammatical-tenses']}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>Form: {item.form}</Text>
            <Text>Variation: {item.variation}</Text>
            <Text>
              Pronunciation (Hiragana): {item['pronunciation-hiragana']}
            </Text>
            <Text>Pronunciation (Romaji): {item['pronunciation-romaji']}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 90,
  },
  title: {
    fontWeight: '900',
  },
  subTitle: {
    fontWeight: '700',
  },
})

export default JapaneseVocabularyDetails
