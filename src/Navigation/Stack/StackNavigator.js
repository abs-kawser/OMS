import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "../DrawerNavigation/DrawerNavigator";
import RegistrationPage from "../../RegistrationPage";
import CreateOrderDetails from "../../CreateOrderDetails";
import { NavigationContainer } from "@react-navigation/native";
import LoginPage from "../../LoginPage";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerNavigato"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

      {/* take screen  */}

      <Stack.Screen
        name="CreateOrderDetails"
        component={CreateOrderDetails}
        options={{
          headerShown: false,
          //headerBackVisible: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

//first take that drawer navigation component then  do one page to an
