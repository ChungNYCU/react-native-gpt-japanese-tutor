import { useEffect, useState } from 'react'
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  Keyboard,
} from 'react-native'

import i18n from '../locales/i18n'
import Button from '../components/Button'
import SettingScreenStyle from '../styles/SettingScreenStyle'

const styles = SettingScreenStyle

const SettingsScreen = () => {
  useEffect(() => {
    Keyboard.dismiss()
  }, [])

  const [selectedLanguage, setSelectedLanguage] = useState('')

  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  const onLanguageChange = (value) => {
    setSelectedLanguage(value)
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
          <Button>
            <Text style={styles.settingLabel}>English</Text>
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
