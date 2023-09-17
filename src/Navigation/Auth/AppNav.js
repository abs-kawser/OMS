import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useLogin } from "../../Context/LoginProvider";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "../Stack/StackNavigator";
import AuthNavigator from "./AuthNavigator";

const AppNav = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { login,userDetails}= isLoggedIn

  return (
    <NavigationContainer>
      {isLoggedIn.login ? <StackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
