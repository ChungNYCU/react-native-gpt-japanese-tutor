import { I18n } from 'i18n-js'
import * as Localization from 'expo-localization'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { enUS } from './en-us'
import { zhTW } from './zh-tw'

const localeKey = 'locale' // The key used to store the locale in AsyncStorage

const getStoredLocale = async () => {
  try {
    const storedLocale = await AsyncStorage.getItem(localeKey)
    return storedLocale || Localization.locale // Use the stored locale or the device's default locale
  } catch (error) {
    console.error('Error retrieving locale from AsyncStorage:', error)
    return Localization.locale // Fallback to the device's default locale on error
  }
}

const i18n = new I18n({
  'en-US': enUS,
  'zh-TW': zhTW,
})

getStoredLocale().then((locale) => {
  i18n.defaultLocale = locale
  i18n.locale = locale
})

export default i18n
