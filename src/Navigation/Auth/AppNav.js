import { StyleSheet, Text, View } from "react-native";
import React, { useContext,useEffect } from "react";
import { useLogin } from "../../Context/LoginProvider";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "../Stack/StackNavigator";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigator from "../DrawerNavigation/DrawerNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AppNav = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { login, userDetails } = isLoggedIn;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");

        if (userData !== null) {
          // setUserDetails(JSON.parse(userData));
          // setIsLoggedIn(true);
          setIsLoggedIn((prevUserDetails) => ({
            ...prevUserDetails,
            login: true,
            userDetails: JSON.parse(userData),
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <NavigationContainer>
      
      {/* {isLoggedIn.login ? (
        <StackNavigator />
      ) : isLoggedIn.login && isLoggedIn.userDetails ? (
        <DrawerNavigator />
      ) : (
         
      )} */}

      {isLoggedIn.login && isLoggedIn.userDetails ? <StackNavigator/> : <AuthNavigator/>} 
    </NavigationContainer>
  );
};

export default AppNav;

const styles = StyleSheet.create({});
