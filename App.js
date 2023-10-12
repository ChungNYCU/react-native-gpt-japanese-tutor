import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import StackScreen from './src/components/StackScreen'

const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        screenOptions={{ drawerPosition: 'right', headerShown: false }}
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
    </NavigationContainer>
  )
}

export default App
