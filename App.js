import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import LoginProvider from "./src/Context/LoginProvider";
import AppNav from "./src/Navigation/Auth/AppNav";
import CustomerProvider from "./src/Context/CustomerProvider";

const App = () => {
  return (
    <LoginProvider>
      <CustomerProvider>
        <PaperProvider>
          <AppNav />
        </PaperProvider>
      </CustomerProvider>
    </LoginProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
