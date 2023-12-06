import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import base64 from "base-64";
import Header from "../../components/Header";
import { useLogin } from "../Context/LoginProvider";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";

const LoginPage = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  //error handleing
  const [error, setError] = useState(null);
  const [loginResponse, setloginResponse] = useState(null);

  //useContext api
  const { isLoggedIn, setIsLoggedIn } = useLogin();

  //loading
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Start loading
      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
      const response = await fetch(
        `${BASE_URL}/api/HomeApi/Login?networkId=${userId}&password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
        }
      );
      const result = await response.json();
      // setloginResponse(result);
      // console.log("API response:", result);

      setIsLoading(false);
      // Stop loading
      // console.log('this is login details', result.EmployeeId);
      if (result.EmpId) {
        // Save user authentication details in AsyncStorage
        await AsyncStorage.setItem("userData", JSON.stringify(result));
        setIsLoggedIn((prevUserDetails) => ({
          ...prevUserDetails,
          login: true,
          userDetails: result,
        }));
        navigation.navigate("DrawerNavigator");
        ToastAndroid.show(
          result.EmpId && "Login Successfully",
          ToastAndroid.SHORT
        );
      } else {
        const errorMessage = result;
        setError(errorMessage);
        console.log("errorMessage", errorMessage);
      }
    } catch (error) {
      console.error("AsyncStorage Error:", error);
    }
  };

  const handleRegisterNow = () => {
    navigation.navigate("Register");
  };

  const isLoginButtonDisabled = !userId || !password;

  return (
    <>
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <Text style={styles.headerText}>Welcome back! plz login</Text>
        </View> */}
        <Animatable.View animation="fadeInUp" style={styles.formContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome Back</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="User Id"
            placeholderTextColor="black"
            onChangeText={(text) => setUserId(text)}
            value={userId}
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

          {/* <Button
            mode="contained"
            buttonColor="#00a6fb"
            style={styles.button}
            onPress={handleLogin}
            loading={isLoading}
            //disabled={isLoading} // Disable the button when loading
          >
            {isLoading ? (
              <ActivityIndicator color="red" size="small" />
            ) : (
              "Login"
            )}
          </Button> */}

          <TouchableOpacity
            style={[
              styles.loginButton,
              {
                backgroundColor: isLoginButtonDisabled ? "#B3B3B3" : "#3498db",
              },
            ]}
            onPress={handleLogin}
            disabled={isLoginButtonDisabled}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity style={styles.signupButton}>
              <Text style={styles.signupButtonText} onPress={handleRegisterNow}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              color: "#495867",
              fontWeight: "700",
              fontFamily: "Roboto-bold",
            }}
          >
            or
          </Text>
          <Button
            // icon="arrow-right"
            mode="contained"
            onPress={handleRegisterNow}
            buttonColor="#00b4d8"
            contentStyle={{ flexDirection: "row-reverse" }}
            style={styles.buttonRegister}
          >
            Register
          </Button> */}

          
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

  button: {
    // width: "50%",
    marginTop: 20,
    // alignSelf: "center",
  },
  buttonRegister: {
    // width: "50%",
    // marginTop: 10,
    // alignSelf: "center",
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    // marginVertical: 10,
  },

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

  header: {
    marginBottom: 20,
    alignItems: "center",

  },
  headerText: {
    fontSize: 24,
    color: "black",
    fontWeight: "700",
    fontFamily: "Roboto-bold",
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

  loginButton: {
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 15,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Roboto-bold",
  },
});



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: "center",
//     backgroundColor: "lightblue",
//   },
//   header: {
//     alignItems: "center",
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   imageContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     resizeMode: "contain",
//   },
//   input: {
//     // borderWidth: 1,
//     // borderColor: "#ccc",
//     // borderRadius: 5,
//     // padding: 10,
//     // marginBottom: 16,
//     // fontSize: 16,

//     backgroundColor: "white",
//     marginBottom: 10,
//     color: "black",
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     width: 350,
//     alignSelf: "center",
//   },
//   loginButton: {
//     flexDirection: "row",
//     padding: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "25%",
//     backgroundColor: "#00a6fb",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 5,
//     alignItems: "center",
//     alignSelf: "center",
//     marginBottom: 16,
//   },
//   loginButtonTextX: {
//     fontSize: 15,
//     //fontWeight: 'bold',
//     color: "white",
//     fontWeight: "bold",
//   },
//   registerNow: {
//     alignItems: "center",
//   },
//   registerNowText: {
//     fontSize: 16,
//     color: "black",
//     //fontWeight: "bold",
//     textDecorationLine: "underline",
//   },
//   warning: {
//     color: "red",
//   },
//   button: {
//     width: "40%",
//     marginTop: 20,
//     alignSelf: "center",
//   },
//   buttonRegister: {
//     width: "40%",
//     marginTop: 20,
//     alignSelf: "center",
//   },
// });

export default LoginPage;
