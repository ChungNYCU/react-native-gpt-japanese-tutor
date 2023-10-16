import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'

import MainNavigation from './src/navigations/MainNavigation'

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <MainNavigation />
    </NavigationContainer>
  )
}

export default App
