import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNavigator from './src/Navigation/DrawerNavigation/DrawerNavigator'

const App = () => {
  return (
    <NavigationContainer>
    <DrawerNavigator />
    
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})