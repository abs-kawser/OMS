import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { lightBlue100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import FanseCards from "../../components/FanseCards";
import ElevatedCards from "../../components/ElevatedCards";
import { useLogin } from "../Context/LoginProvider";
import FlatCards from "../../components/FlatCards";

export default function Home() {
  //it comes from contex
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;

  return (
    <ScrollView style={{ backgroundColor: "#fdfffc" }}>
      <View style={styles.centeredContainer}>
        <Text style={styles.welcomeText}>Welcome to oms</Text>
        {/* <Text style={styles.detailsText}>This is your details</Text> */}
      </View>

      <View style={styles.container}>
        <Text style={styles.Details}>User Information</Text>
        <Text style={styles.text}>Name:{userDetails.FullName}</Text>
        <Text style={styles.text}> EmpId:{userDetails.EmpId}</Text>
        <Text style={styles.text}> Email:{userDetails.Email}</Text>
        <Text style={styles.text}> Mobile:{userDetails.MobileNo}</Text>
        <Text style={styles.text}>
          Designation:{userDetails.DesignationName}
        </Text>
        <Text style={styles.text}>Full Region:{userDetails.RegionName}</Text>
      </View>

      <View>
            <FlatCards/>
        </View>    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 15,

    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flex: 1,
    backgroundColor: "#a8dadc",
    elevation:5
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  Details: {
    alignSelf: "center",
    color: "#000",
    fontSize: 28,
    fontStyle:"italic"
    // fontWeight: "bold",
  },
  centeredContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // Add margin top for separation
  },
  welcomeText: {
    fontSize: 24,
    // fontWeight: "bold",
    color: "#05668d",
    marginBottom: 10, // Add margin bottom for separation
  },
  detailsText: {
    fontSize: 18,
    color: "#333",
    color: "#f0efeb",
  },
});
