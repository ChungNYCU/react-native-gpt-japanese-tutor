import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Button from './Button'
import i18n from '../locales/i18n'
import { locales } from '../locales/locales'

const JapaneseSentenceDetails = ({ sentenceData, drillDown }) => {
  if (!sentenceData || typeof sentenceData !== 'object') {
    return <Text>{sentenceData}</Text>
  }

  try {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t(locales.detail)}:</Text>
        <Text style={styles.text}>
          {i18n.t(locales.sentence)}: {sentenceData.sentence}
        </Text>
        <Text style={styles.text}>{sentenceData.translation}</Text>
        <Text style={styles.text}>
          {sentenceData['pronunciation-hiragana']}
        </Text>
        <Text style={styles.text}>{sentenceData['pronunciation-romaji']}</Text>
        <Text style={styles.text}>{sentenceData.grammar}</Text>
        <View style={styles.keywordContainer}>
          {sentenceData.keywords.map((keyword, index) => (
            <Button
              key={index}
              style={styles.keywordButton}
              onPress={() => drillDown(keyword)}
            >
              <Text>{keyword}</Text>
            </Button>
          ))}
        </View>
      </View>
    )
  } catch (error) {
    return <Text>{error}</Text>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#91F2CD',
    marginHorizontal: '1%',
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
  keywordContainer: {
    flexDirection: 'row',
  },
  keywordButton: {
    backgroundColor: '#FFF59E',
    marginHorizontal: 5,
    marginTop: 10,
    width: 'auto',
  },
})

export default JapaneseSentenceDetails
