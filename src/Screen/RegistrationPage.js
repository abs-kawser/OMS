// import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { fetchRegistrationData } from "../Api/RegistrationApi";
import base64 from "base-64";
import { Divider } from "react-native-paper";
import { Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { color } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";

import { BASE_URL, PASSWORD, USERNAME } from "../../varible";

const RegistrationPage = ({ navigation }) => {


  const [userId, setUserId] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  // Add more state variables as needed for handling API response and loading state
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  // const handleRegistration = async () => {
  //   try {
  //     const response = await fetchRegistrationData(
  //       setIsLoading,
  //       networkId,
  //       mobile,
  //       password
  //     );
  //     console.log("API response This", response);

  //     // if (response.Success === false) {
  //     //   setError(response.Message);
  //     // }
  //   } catch (error) {
  //     console.error("Error handling registration:", error);
  //   }
  // };

  const fetchRegistrationData = async () => {
    try {
      const requestData = {
        // CustomerId: 318233,
        NetworkId: userId,
        MobileNo: mobile,
        Password: password,
      };
      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
      const response = await fetch(`${BASE_URL}/api/HomeApi/Registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(requestData),
      });
      const jsonData = await response.json();
      console.log("this is api response", JSON.stringify(jsonData, null, 2));

      if (jsonData.Success === false) {
        setError(jsonData.Message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      // setIsLoading(false);
      // setIsLoading(false);
      throw error;
    }

  };

  const isRegisterDisabled = !setUserId || !password || !mobile;


  return (

    <>
      <View style={styles.container}>
        <Animatable.View animation="fadeInUp" style={styles.formContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Register Here</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="User ID"
            placeholderTextColor="black"
            value={userId}
            onChangeText={(text) => setUserId(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Mobile"
            placeholderTextColor="black"
            value={mobile}
            onChangeText={(text) => setMobile(text)}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "eye" : "eye-slash"}
                size={20}
                color="#495867"
              />
            </TouchableOpacity>
          </View>
          {error !== "" && <Text style={styles.errorMessage}>{error}</Text>}
          <TouchableOpacity
            style={[
              styles.loginButton,
              {
                backgroundColor: isRegisterDisabled ? "#B3B3B3" : "#00b4d8",
              },
            ]}
            onPress={fetchRegistrationData}
            disabled={isRegisterDisabled}
          >
            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>

          {/* <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              color: "black",
              fontWeight: "700",
              fontFamily: "Roboto-bold",
              // marginTop:10
            }}
          >
            or
          </Text>



          <TouchableOpacity
            style={[
              styles.loginButton,
              // {
              //   backgroundColor: isRegisterDisabled ? "#B3B3B3" : "#3498db",
              // },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity> */}

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity style={styles.signupButton}>
              <Text
                style={styles.signupButtonText}
                onPress={() => navigation.goBack()}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>

        </Animatable.View>
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#3498db",
    backgroundColor: "#36485f",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: "black",
    marginBottom: 10,
    fontWeight: "700",
    fontFamily: "Roboto-bold",
  },
  formContainer: {
    // backgroundColor: "#fcf6bd",
    backgroundColor: "#F5F7F8",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    margin: 20,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
  },
  registerButton: {
    backgroundColor: "#3498db",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  //
  passwordContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
  },
  iconContainer: {
    position: "absolute",
    top: 20,
    right: 10,
  },
  //
  loginButton: {
    backgroundColor: "#3498db",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    // marginTop: 15,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Roboto-bold",
  },
  errorMessage: {
    // padding:10,
    color: "red",
    fontSize: 15,
    textAlign: "center",
    padding: 5,
  },

  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  signupText: {
    color: "#333333",
    marginRight: 5,
  },
  signupButton: {
    borderBottomWidth: 1,
    borderBottomColor: "#3498db",
  },
  signupButtonText: {
    color: "#3498db",
    fontSize: 16,
  },
});
export default RegistrationPage;


