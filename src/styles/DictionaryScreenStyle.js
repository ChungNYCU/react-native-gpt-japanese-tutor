import { StyleSheet } from 'react-native'

const dictionaryScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    width: '80%',
    height: 45,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  queryButton: {
    backgroundColor: '#cccccc',
  },
  resultContainer: {
    flex: 10,
    width: '98%',
  },
  apiResult: {
    marginTop: 10,
    // fontFamily: 'monospace',
  },
  message: {
    margin: 10,
  },
})

export default dictionaryScreenStyles
