import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { lightBlue100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import FanseCards from "../../components/FanseCards";
import ElevatedCards from "../../components/ElevatedCards";
import { useLogin } from "../Context/LoginProvider";

export default function Home() {
  //it comes from contex 
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { login,userDetails}= isLoggedIn
  return (
    <View>
        <Text style={{ color:"red"}}> FullName:{userDetails.FullName}</Text>
      {/* <Header/> */}
      <FanseCards />

      <ElevatedCards />
    </View>
  );
}

const styles = StyleSheet.create({});
