import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/Navigation/DrawerNavigation/DrawerNavigator";
import { PaperProvider } from "react-native-paper";
import { AppRegistry } from 'react-native';

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;


const styles = StyleSheet.create({});
