import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const JapaneseVocabularyDetails = ({ vocabularyData }) => {
  if (!vocabularyData) return

  const { basic, detail } = vocabularyData

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Information:</Text>
      <Text style={styles.text}>Vocabulary: {basic.vocabulary}</Text>
      <Text style={styles.text}>Type: {basic.type}</Text>
      <Text style={styles.subTitle}>Pronunciation:</Text>
      <Text style={styles.text}>{basic['pronunciation-hiragana']}</Text>
      <Text style={styles.text}>{basic['pronunciation-romaji']}</Text>

      <Text style={styles.title}>Detail:</Text>
      <Text>
        Definition: {detail.definition.replace('${language}', 'Your Language')}
      </Text>

      <View>
        <Text style={styles.title}>Sample Sentences:</Text>
        {detail['sample-sentences'].map((item, index) => (
          <View key={index}>
            <Text style={styles.text}>{item.sentence}</Text>
            <Text style={styles.text}>{item['pronunciation-hiragana']}</Text>
            <Text style={styles.text}>{item['pronunciation-romaji']}</Text>
            <Text style={styles.text}>
              {item.translation.replace('${language}', 'Your Language')}
            </Text>
            <View style={styles.boarderLine} />
          </View>
        ))}
      </View>

      <Text style={styles.title}>Grammatical Tenses:</Text>
      <FlatList
        data={detail['grammatical-tenses']}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tenseCard}>
            <Text style={styles.text}>Form: {item.form}</Text>
            <Text style={styles.text}>Variation: {item.variation}</Text>
            <Text style={styles.subTitle}>Pronunciation:</Text>
            <Text style={styles.text}>{item['pronunciation-hiragana']}</Text>
            <Text style={styles.text}>{item['pronunciation-romaji']}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '1%',
    backgroundColor: '#ffffff',
    width: '98%',
  },
  title: {
    marginTop: 5,
    marginBottom: 1,
    fontWeight: '900',
  },
  subTitle: {
    marginTop: 3,
    fontWeight: '700',
  },
  text: {
    marginVertical: 3,
  },
  boarderLine: {
    height: 1,
    backgroundColor: 'gray',
  },
  tenseCard: {
    marginRight: 20,
  },
})

export default JapaneseVocabularyDetails
