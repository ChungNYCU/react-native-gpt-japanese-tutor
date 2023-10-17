import { useState } from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Ionicons } from '@expo/vector-icons'

import FunctionalHeaderStyle from '../styles/FunctionalHeaderStyle'
import Button from './Button'

const styles = FunctionalHeaderStyle

const FunctionalHeader = () => {

  return (
    <View style={styles.header}>

      <Button
        title={() => <Ionicons name="settings-sharp" size={24} color="black" />}
      />

    </View>
  )
}

export default FunctionalHeader
