import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import Button from './Button'
import i18n from '../locales/i18n'
import { locales } from '../locales/locales'

const JapaneseVocabularyDetails = ({ vocabularyData, drillDown }) => {
  if (!vocabularyData || typeof vocabularyData !== 'object') {
    return <Text>{vocabularyData}</Text>
  }

  const { basic, detail } = vocabularyData

  try {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t(locales.basicInfo)}:</Text>
        <Text style={styles.text}>
          {i18n.t(locales.vocabulary)}: {basic.vocabulary}
        </Text>
        <Text style={styles.text}>
          {i18n.t(locales.type)}: {basic.type}
        </Text>
        <Text style={styles.subTitle}>{i18n.t(locales.pronunciation)}:</Text>
        <Text style={styles.text}>{basic['pronunciation-hiragana']}</Text>
        <Text style={styles.text}>{basic['pronunciation-romaji']}</Text>

        <Text style={styles.title}>{i18n.t(locales.detail)}:</Text>
        <Text>
          {i18n.t(locales.definition)}:{' '}
          {detail.definition.replace('${language}', 'Your Language')}
        </Text>

        <View>
          <Text style={styles.title}>{i18n.t(locales.sampleSentence)}:</Text>
          {detail['sample-sentences'].map((item, index) => (
            <View key={index}>
              <View style={styles.sentenceContainer}>
                <Button
                  style={styles.sentenceButton}
                  onPress={() => drillDown(item.sentence)}
                >
                  <Text style={styles.text}>{item.sentence}</Text>
                </Button>
              </View>

              <Text style={styles.text}>{item['pronunciation-hiragana']}</Text>
              <Text style={styles.text}>{item['pronunciation-romaji']}</Text>
              <Text style={styles.text}>
                {item.translation.replace('${language}', 'Your Language')}
              </Text>
              <View style={styles.boarderLine} />
            </View>
          ))}
        </View>

        <Text style={styles.title}>{i18n.t(locales.grammaticalTense)}:</Text>
        <FlatList
          data={detail['grammatical-tenses']}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.tenseCard}>
              <Text style={styles.text}>
                {i18n.t(locales.form)}: {item.form}
              </Text>
              <Text style={styles.text}>
                {i18n.t(locales.variation)}: {item.variation}
              </Text>
              <Text style={styles.subTitle}>
                {i18n.t(locales.pronunciation)}:
              </Text>
              <Text style={styles.text}>{item['pronunciation-hiragana']}</Text>
              <Text style={styles.text}>{item['pronunciation-romaji']}</Text>
            </View>
          )}
        />
      </View>
    )
  } catch (error) {
    return <Text>error</Text>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF59E',
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
  sentenceContainer: {
    flexDirection: 'row',
    width: 'auto',
  },
  sentenceButton: {
    backgroundColor: '#91F2CD',
    marginTop: 5,
  },
})

export default JapaneseVocabularyDetails
