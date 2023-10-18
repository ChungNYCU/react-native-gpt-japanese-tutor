import { useEffect, useState } from 'react'
import { View, Text, Switch, ScrollView, Keyboard, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import i18n from '../locales/i18n'
import Button from '../components/Button'
import SettingScreenStyle from '../styles/SettingScreenStyle'

const styles = SettingScreenStyle

const SettingsScreen = () => {
  useEffect(() => {
    async function fetchLocale() {
      try {
        const locale = await AsyncStorage.getItem('locale')
        if (locale !== null) {
          setSelectedLanguage(locale)
        }
      } catch (error) {
        console.error('Error fetching locale from AsyncStorage:', error)
      }
    }
    Keyboard.dismiss()
    fetchLocale()
  }, [])

  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  const onLanguageChange = async () => {
    const locale = await AsyncStorage.getItem('locale')
    if (locale === 'en-US') {
      await AsyncStorage.setItem('locale', 'zh-TW')
    } else {
      await AsyncStorage.setItem('locale', 'en-US')
    }
    setSelectedLanguage(await AsyncStorage.getItem('locale'))
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
          <Text style={styles.settingLabel}>{i18n.t('systemLanguage')}</Text>
          <Button onPress={onLanguageChange}>
            <Text style={styles.settingLabel}>{selectedLanguage}</Text>
          </Button>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>
            {i18n.t('enableNotifications')}
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>{i18n.t('darkMode')}</Text>
          <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
        </View>
      </ScrollView>
    </View>
  )
}

export default SettingsScreen
