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

const LoginPage = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
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

    
    <>
      <Header />

      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: "https://i.postimg.cc/brxvykCD/login.png",
              }}
              style={styles.image}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="User Id"
            onChangeText={(text) => setUserId(text)}
            value={userId}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />

          {error && <Text style={styles.warning}>{error}</Text>}

          <TouchableOpacity
          // style={styles.loginButton} onPress={handleLogin}
          >
            <Button
              mode="contained"
              buttonColor="#00a6fb"
              style={styles.button}
              onPress={handleLogin}
            >
              Login
            </Button>
            {/* {isLoading && <ActivityIndicator size="small" color="red" />} */}
            {/* <Text style={styles.loginButtonTextX}>Loginn</Text> */}
          </TouchableOpacity>

          <Button
            icon="arrow-right"
            mode="contained"
            onPress={handleRegisterNow}
            buttonColor="#00b4d8"
            contentStyle={{ flexDirection: "row-reverse" }}
            style={styles.buttonRegister}
          >
            Register Now
          </Button>
        </SafeAreaView>
      </View>
    </>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "lightblue",
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  input: {
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 5,
    // padding: 10,
    // marginBottom: 16,
    // fontSize: 16,

    backgroundColor: "white",
    marginBottom: 10,
    color: "black",
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 350,
    alignSelf: "center",
  },
  loginButton: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    backgroundColor: "#00a6fb",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  loginButtonTextX: {
    fontSize: 15,
    //fontWeight: 'bold',
    color: "white",
    fontWeight: "bold",
  },
  registerNow: {
    alignItems: "center",
  },
  registerNowText: {
    fontSize: 16,
    color: "black",
    //fontWeight: "bold",
    textDecorationLine: "underline",
  },
  warning: {
    color: "red",
  },
  button: {
    width: "40%",
    marginTop: 20,
    alignSelf: "center",
  },
  buttonRegister: {
    width: "40%",
    marginTop: 20,
    alignSelf: "center",
  },
});

export default LoginPage;


