import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const JapaneseSentenceDetails = ({ sentenceData }) => {
  if (!sentenceData || typeof sentenceData !== 'object') {
    return <Text>{sentenceData}</Text>
  }

  try {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Detail:</Text>
        <Text style={styles.text}>Sentence: {sentenceData.sentence}</Text>
        <Text style={styles.text}>{sentenceData.translation}</Text>
        <Text style={styles.text}>
          {sentenceData['pronunciation-hiragana']}
        </Text>
        <Text style={styles.text}>{sentenceData['pronunciation-romaji']}</Text>
        <Text style={styles.text}>{sentenceData.grammar}</Text>
      </View>
    )
  } catch (error) {
    return <Text>{error}</Text>
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '1%',
    backgroundColor: '#91F2CD',
    width: '98%',
    padding: 10,
    borderRadius: 10,
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

export default JapaneseSentenceDetails
