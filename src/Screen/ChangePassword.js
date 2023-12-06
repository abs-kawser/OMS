import React, { useState } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { TextInput as PaperTextInput, Button } from "react-native-paper";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import base64 from "base-64";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../Context/LoginProvider";

const ChangePassword = () => {
  const navigation = useNavigation();

  const { isLoggedIn, setIsLoggedIn } = useLogin();

  const { userDetails } = isLoggedIn;
  console.log("userDetails", JSON.stringify(userDetails, null, 2));

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const SavePassword = async () => {
    // Check if any field is empty
    if (!oldPassword || !newPassword || !ConfirmPassword) {
      ToastAndroid.show("Please fill in all fields.", ToastAndroid.SHORT);
      return;
    }

    if (newPassword !== ConfirmPassword) {
      // Passwords do not match, show a toast message
      ToastAndroid.show(
        "New password and confirm password do not match.",
        ToastAndroid.SHORT
      );
      return;
    }

    try {
      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
      const response = await fetch(
        `${BASE_URL}/api/HomeApi/ChangePassword?networkId=${userDetails?.EmpNetworkId}&OldPassword=${oldPassword}&NewPassword=${newPassword}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );

      const result = await response.json();
      console.log("response", result);
      if (result.Success === true) {
        ToastAndroid.show(result.Message, ToastAndroid.SHORT);
        //navigation.navigate("Home");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("An error occurred:", error);
    }
  };

  // console.log("Name:", networkId);
  //   console.log("oldPassword:", oldPassword);
  //   console.log("newPassword:", newPassword);
  //   console.log("ConfirmPassword:", ConfirmPassword);

  return (
    <View style={styles.container}>
      {/* <PaperTextInput
        mode="outlined"
        label="User Id"
        style={styles.input}
        value={networkId.toString()}
        onChangeText={(text) => setNetworkId(text)}
        keyboardType="phone-pad"
        outlineColor="#00a6fb"
        activeOutlineColor="#60d394"
      /> */}
         

      <PaperTextInput
        mode="outlined"
        label="Old Password"
        style={styles.input}
        value={oldPassword.toString()}
        onChangeText={(text) => setOldPassword(text)}
        keyboardType="phone-pad"
        outlineColor="#00a6fb"
        activeOutlineColor="#60d394"
      />
      <PaperTextInput
        mode="outlined"
        label="New Password"
        style={styles.input}
        value={newPassword.toString()}
        onChangeText={(text) => setNewPassword(text)}
        keyboardType="phone-pad"
        outlineColor="#00a6fb"
        activeOutlineColor="#60d394"
      />
      <PaperTextInput
        mode="outlined"
        label="Confirm password"
        style={styles.input}
        value={ConfirmPassword.toString()}
        onChangeText={(text) => setConfirmPassword(text)}
        keyboardType="phone-pad"
        // textColor="gray"
        outlineColor="#00a6fb"
        activeOutlineColor="#60d394"
      />
      <Button
        mode="contained"
        buttonColor="#00a6fb"
        style={styles.button}
        onPress={SavePassword}
      >
        UPDATE 
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor:"#36485f"
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  input: {
    // width: '80%',
    marginBottom: 20,
    backgroundColor: "#F1EFEF",
  },
  button: {
    width: "40%",
    marginTop: 20,
    alignSelf: "center",
  },
});

export default ChangePassword;

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import LottieView from "lottie-react-native"; // Import LottieView

// export default function NoOrder() {
//   return (
//     <View >
//       <View><Text> fdedf</Text></View>
//     <LottieView
//       source={require("../../Lottie/animation_ln8n5kbe.json")} // Replace with your animation file path
//       autoPlay
//       loop
//       style={styles.loadingContainer}
//     />
//   </View>

//   )
// }

// const styles = StyleSheet.create({
//   loadingContainer:{
//     height:100,
//     width:100
//   }

// })
