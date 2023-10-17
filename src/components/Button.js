import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

const Button = ({ title }) => {
  const Title = title
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
      android_ripple={{ color: 'lightgray', borderless: true }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Title />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginRight: 5,
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: 'gray',
    opacity: 0.7,
  },
})

export default Button
