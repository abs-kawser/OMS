import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import LoginProvider from "./src/Context/LoginProvider";
import AppNav from "./src/Navigation/Auth/AppNav";
import CustomerProvider from "./src/Context/CustomerProvider";
import DraftProvider from "./src/Context/DraftProvider";
import { ToastProvider } from "react-native-toast-notifications";

const App = () => {
  return (
    <LoginProvider>
      <CustomerProvider>
        <DraftProvider>
          <PaperProvider>
            <ToastProvider>
              <AppNav />
            </ToastProvider>
          </PaperProvider>
        </DraftProvider>
      </CustomerProvider>
    </LoginProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
