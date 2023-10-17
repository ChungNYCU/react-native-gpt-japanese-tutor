import { StyleSheet } from 'react-native'

const SettingScreenStyle = StyleSheet.create({
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
})

export default SettingScreenStyle
