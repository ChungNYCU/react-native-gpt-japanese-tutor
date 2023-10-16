import { StyleSheet } from 'react-native'

const FunctionalHeaderStyle = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      backgroundColor: 'lightgray',
      width: '100%',
      height: 108,
      padding: 10,
    },
    button: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    buttonText: {
      color: 'white',
    },
    promptField: {
      width: '80%',
      padding: 10,
      borderRadius: 5,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    picker: {
      width: '80%',
    },
    selectButton: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'green',
    },
  })

export default FunctionalHeaderStyle
