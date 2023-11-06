import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { lightBlue100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import FanseCards from "../../components/FanseCards";
import ElevatedCards from "../../components/ElevatedCards";
import { useLogin } from "../Context/LoginProvider";

export default function Home() {
  //it comes from contex
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;



  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.Details}>User Details</Text>
        <Text style={styles.text}>Name:{userDetails.FullName}</Text>
        <Text style={styles.text}> EmpId:{userDetails.EmpId}</Text>
        <Text style={styles.text}> Email:{userDetails.Email}</Text>
        <Text style={styles.text}> MobileNo:{userDetails.MobileNo}</Text>
        <Text style={styles.text}>
          Designation:{userDetails.DesignationName}
        </Text>
        <Text style={styles.text}>Full Region:{userDetails.RegionName}</Text>
      </View>     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    gap: 10,
    flex:1,
  },
  text: {
    fontSize: 16,
    //fontWeight: "bold",
    color: "#00a6fb",
  },
  Details: {
    alignSelf: "center",
    color: "black",
    fontSize: 25,
    // marginLeft: 50,
    // fontWeight: "bold",
  },


  
});
