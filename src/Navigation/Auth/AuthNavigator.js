import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../../Screen/LoginPage";
import RegistrationPage from "../../Screen/RegistrationPage";


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
          //headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegistrationPage}
        options={{
          headerShown: false,
          //headerBackVisible: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});

//first take that drawer navigation component then  do one page to an
