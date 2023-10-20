import { useEffect, useState } from 'react'
import { Alert, Keyboard, Switch, ScrollView, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Button from '../components/Button'
import i18n from '../locales/i18n'
import { locales } from '../locales/locales'

import SettingScreenStyle from '../styles/SettingScreenStyle'

const styles = SettingScreenStyle

const SettingsScreen = () => {
  useEffect(() => {
    async function fetchLocale() {
      try {
        const locale = await AsyncStorage.getItem(locales.UI_LANGUAGE_KEY)
        if (locale !== null) {
          setSelectedLanguage(locale)
        }
      } catch (error) {
        console.error('Error fetching locale from AsyncStorage:', error)
        setSelectedLanguage('en-US');
      }
    }
    Keyboard.dismiss()
    fetchLocale()
  }, [])

  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  const onLanguageChange = async () => {
    const locale = await AsyncStorage.getItem(locales.UI_LANGUAGE_KEY)
    if (locale === 'en-US') {
      await AsyncStorage.setItem(locales.UI_LANGUAGE_KEY, 'zh-TW')
    } else {
      await AsyncStorage.setItem(locales.UI_LANGUAGE_KEY, 'en-US')
    }
    setSelectedLanguage(await AsyncStorage.getItem(locales.UI_LANGUAGE_KEY))
    Alert.alert(
      'Alert',
      'Please restart or refresh your app to apply system language',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false },
    )
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>{i18n.t(locales.systemLanguage)}</Text>
          <Button onPress={onLanguageChange}>
            <Text style={styles.settingLabel}>{selectedLanguage}</Text>
          </Button>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>
            {i18n.t(locales.enableNotifications)}
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>{i18n.t(locales.darkMode)}</Text>
          <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
        </View>
      </ScrollView>
    </View>
  )
}

export default SettingsScreen
