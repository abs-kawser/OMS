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
  const [error, setError] = useState("");
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
      setIsLoading(false); // Stop loading
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
      }
    } catch (error) {
      console.error("AsyncStorage Error:", error);
    }
  };


  
  const handleRegisterNow = () => {
    navigation.navigate("Register");
  };

  return (
    // <>
    //   <Header />
    //   <View style={styles.container}>
    //     <SafeAreaView>
    //       <View style={styles.imageContainer}>
    //         <Image
    //           source={{
    //             uri: "https://i.postimg.cc/brxvykCD/login.png",
    //           }}
    //           style={styles.image}
    //         />
    //       </View>

    //       <TextInput
    //         style={styles.input}
    //         placeholder="User Id"
    //         onChangeText={(text) => setUserId(text)}
    //         value={userId}
    //       />

    //       <TextInput
    //         style={styles.input}
    //         placeholder="Password"
    //         secureTextEntry={true}
    //         onChangeText={(text) => setPassword(text)}
    //         value={password}
    //       />

    //       {error && <Text style={styles.warning}>{error}</Text>}

    //       <TouchableOpacity
    //       // style={styles.loginButton} onPress={handleLogin}
    //       >
    //         <Button
    //           mode="contained"
    //           buttonColor="#00a6fb"
    //           style={styles.button}
    //           onPress={handleLogin}
    //         >
    //           Login
    //         </Button>
    //         {/* {isLoading && <ActivityIndicator size="small" color="red" />} */}
    //         {/* <Text style={styles.loginButtonTextX}>Loginn</Text> */}
    //       </TouchableOpacity>

    //       <Button
    //         icon="arrow-right"
    //         mode="contained"
    //         onPress={handleRegisterNow}
    //         buttonColor="#00b4d8"
    //         contentStyle={{ flexDirection: "row-reverse" }}
    //         style={styles.buttonRegister}
    //       >
    //         Register Now
    //       </Button>
    //     </SafeAreaView>
    //   </View>
    // </>

    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
        </View>
        <Animatable.View animation="fadeInUp" style={styles.formContainer}>
          {/* <TextInput style={styles.input} placeholder="User ID" />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        /> */}

          <TextInput
            style={styles.input}
            placeholder="User Id"
            placeholderTextColor="black"

            onChangeText={(text) => setUserId(text)}
            value={userId}
          />

          {/* <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        /> */}

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

          {/* <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
          <Text style={styles.registerButtonText}>Loginn</Text>
        </TouchableOpacity> */}

          {/* <Button
            mode="contained"
            buttonColor="#00a6fb"
            style={styles.button}
            onPress={handleLogin}
          >
            Login
          </Button> */} 

           <Button
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
          </Button>

          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              color: "#495867",
              fontWeight: "bold",
            }}
          >
            orr
          </Text>

          <Button
            icon="arrow-right"
            mode="contained"
            onPress={handleRegisterNow}
            buttonColor="#00b4d8"
            contentStyle={{ flexDirection: "row-reverse" }}
            style={styles.buttonRegister}
          >
            Sign Up
          </Button>

          {/* <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerButtonText}>Registerr</Text>
        </TouchableOpacity> */}
        </Animatable.View>
      </View>
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498db",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#fcf6bd",
    marginBottom: 20,
    fontWeight: "700",
    fontFamily: 'Roboto-bold',
  },
  formContainer: {
    backgroundColor: "#fcf6bd",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    margin: 20,
  },
  input: {
    height: 40,
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

  passwordContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: 40,
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
