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
  const { userDetails } = isLoggedIn;

  return (


    // <View>
    //   {/* <Header/> */}
    //   <View style={styles.container}>
    //     <Text style={styles.Details}>User Details Details</Text>
    //     <Text style={styles.text}> FullName:{userDetails.FullName}</Text>
    //     <Text style={styles.text}> EmpId:{userDetails.EmpId}</Text>
    //     <Text style={styles.text}> Email:{userDetails.Email}</Text>
    //     <Text style={styles.text}> MobileNo:{userDetails.MobileNo}</Text>
    //     <Text style={styles.text}>
    //       DesignationName:{userDetails.DesignationName}
    //     </Text>
    //     <Text style={styles.text}>
    //       FulRegionNamelName:{userDetails.RegionName}
    //     </Text>
    //   </View>

    //   {/* <FanseCards />
    //   <ElevatedCards /> */}
    // </View>
 
    <View> 
       
         <Text> abc </Text>
    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 16,
    //fontWeight: "bold",
    color: "#00a6fb",
  },
  Details: {
    marginLeft: 50,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});
