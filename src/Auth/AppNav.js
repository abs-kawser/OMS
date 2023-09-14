import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useLogin } from "../Context/LoginProvider";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "../Navigation/Stack/StackNavigator";
import AuthNavigator from "./AuthNavigator";

const AppNav = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin();

  return (
    <NavigationContainer>
      {isLoggedIn ? <StackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
