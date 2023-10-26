import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

const Button = ({ children, onPress = () => {}, style = {} }) => {
  const [isPressed, setIsPressed] = useState(false)

  const handlePressIn = () => {
    setIsPressed(true)
  }

  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <Pressable
      style={[styles.button, style, isPressed && styles.buttonPressed]}
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
    opacity: 1,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  android_ripple: {
    borderless: true,
  },
})

export default Button
