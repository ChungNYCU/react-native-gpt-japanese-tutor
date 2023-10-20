import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { locales } from './locales'

const UI_LANGUAGE_KEY = locales.UI_LANGUAGE_KEY

const i18n = new I18n()

const getStoredLocale = async () => {
  try {
    const storedLocale = await AsyncStorage.getItem(UI_LANGUAGE_KEY)
    return storedLocale || Localization.locale
  } catch (error) {
    console.error('Error retrieving locale from AsyncStorage:', error)
    return Localization.locale
  }
}

getStoredLocale().then((locale) => {
  switch (locale) {
    case 'en-US':
      const enUS = require('./en-us.json')
      i18n.translations = { 'en-US': enUS }
      break
    case 'zh-TW':
      const zhTW = require('./zh-tw.json')
      i18n.translations = { 'zh-TW': zhTW }
      break
    default:
      const en = require('./en-us.json')
      i18n.translations = { 'en-US': en }
  }
  i18n.defaultLocale = locale
  i18n.locale = locale
})

export default i18n
