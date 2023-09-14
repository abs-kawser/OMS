import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import StackNavigator from "./src/Navigation/Stack/StackNavigator";
import LoginProvider from "./src/Context/LoginProvider";
import AppNav from "./src/Auth/AppNav";

const App = () => {
  return (

    <LoginProvider> 
    <PaperProvider>
        <AppNav />
      
    </PaperProvider>
    </LoginProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
