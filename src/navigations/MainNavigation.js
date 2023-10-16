import * as React from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import FunctionalHeader from '../components/FunctionalHeader'
import StackScreen from '../components/StackScreen'
import MainNavigationStyle from '../styles/MainNavigationStyle'

const styles = MainNavigationStyle
const Tab = createBottomTabNavigator()

const MainNavigation = () => {
  return (
    <View style={styles.container}>
      <FunctionalHeader />

      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Tab.Navigator
          initialRouteName="Home"
          backBehavior="initialRoute"
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen
            name="HomeTopLevel"
            options={{
              tabBarLabel: 'Home',
            }}
          >
            {() => <StackScreen routeName="Home" />}
          </Tab.Screen>

          <Tab.Screen
            name="DictionaryTopLevel"
            options={{
              tabBarLabel: 'Dictionary',
            }}
          >
            {() => <StackScreen routeName="Dictionary" />}
          </Tab.Screen>
        </Tab.Navigator>
      </KeyboardAvoidingView>
    </View>
  )
}

export default MainNavigation
