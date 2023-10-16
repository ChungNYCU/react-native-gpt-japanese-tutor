import { useState } from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import FunctionalHeaderStyle from '../styles/FunctionalHeaderStyle'

const styles = FunctionalHeaderStyle

const FunctionalHeader = () => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [selectedValue, setSelectedValue] = useState('What you want to do?')

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const closeAndSetSelectedValue = () => {
    setModalVisible(false)
    selectedValue
      ? setSelectedValue(selectedValue)
      : setSelectedValue('What you want to do?')
  }

  return (
    <View style={styles.header}>

      <Pressable style={styles.promptField} onPress={toggleModal}>
        <Text style={styles.buttonText}>{selectedValue}</Text>
      </Pressable>

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="What you want to do?" value="" />
              <Picker.Item label="Ask about a vocabulary" value="vocabulary" />
              <Picker.Item label="Ask about a sentence" value="sentence" />
              <Picker.Item
                label="Translate Chinese to Japanese"
                value="translate"
              />
            </Picker>

            <Pressable
              onPress={closeAndSetSelectedValue}
              style={styles.selectButton}
            >
              <Text>Select</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Setting</Text>
      </Pressable>
    </View>
  )
}

export default FunctionalHeader
