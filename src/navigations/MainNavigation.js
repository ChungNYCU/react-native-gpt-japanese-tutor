import * as React from 'react'
import { View, KeyboardAvoidingView } from 'react-native'

import StackScreen from './StackScreen'
import MainNavigationStyle from '../styles/MainNavigationStyle'

const styles = MainNavigationStyle

const MainNavigation = () => {

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StackScreen routeName={'Dictionary'}></StackScreen>
      </KeyboardAvoidingView>
    </View>
  )
}

export default MainNavigation
