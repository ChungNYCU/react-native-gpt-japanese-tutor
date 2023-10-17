import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

const Button = ({ children, onPress }) => {
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <Pressable
      style={[styles.button, isPressed && styles.buttonPressed]}
      android_ripple={styles.android_ripple}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'lightgray',
  },
  buttonPressed: {
    backgroundColor: 'gray',
    opacity: 0.7,
  },
  android_ripple: {
    color: 'lightgray',
    borderless: true,
  },
})

export default Button
