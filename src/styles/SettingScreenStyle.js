import { StyleSheet } from 'react-native'

const SettingScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: 20,
    backgroundColor: '#ffffff',
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
})

export default SettingScreenStyle
