import { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, Keyboard } from 'react-native';

import Button from '../components/Button';

const SettingsScreen = () => {

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const [selectedLanguage, setSelectedLanguage] = useState('');

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const onLanguageChange = (value) => {
    setSelectedLanguage(value);
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  return (
    <View style={styles.container}>
      <ScrollView>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Preferred Language</Text>
          <Button >
            <Text style={styles.settingLabel}>English</Text>
          </Button>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={toggleDarkMode}
          />
        </View>

      </ScrollView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 100,
    flex: 1,
    padding: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
  },
});

export default SettingsScreen;
