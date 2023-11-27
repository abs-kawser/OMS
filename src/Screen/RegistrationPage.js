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

const RegistrationPage = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  console.log("USer id", userId);

  // Add more state variables as needed for handling API response and loading state
  const [isLoading, setIsLoading] = useState(false);
  const [registrationResponse, setRegistrationResponse] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistration = async () => {
    // Validate user input here if needed
    //setIsLoading(true);
    try {
      const response = await fetchRegistrationData(
        setIsLoading,
        userId,
        mobile,
        password
      );
      setRegistrationResponse(response);
      console.log("API response:", response);
    } catch (error) {
      //Alert.alert('Error', 'Failed to register. Please try again later.');
      console.error(error);
    }
  };

  return (
    <>
      {/* <Header /> */}
      {/* <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.commontextContainer}>
                <Text style={styles.commonText}>Here's</Text>
                <Text style={styles.commonText}>your first</Text>
                <Text style={styles.commonText}>step with</Text>
                <Text style={styles.commonText}>us</Text>
              </View>

              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri: "https://i.postimg.cc/76T31pPv/register.png",
                  }}
                  style={styles.image}
                />
              </View>
            </View>

            <View style={styles.content}>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="User ID"
                  placeholderTextColor="black"
                  value={userId}
                  onChangeText={(text) => setUserId(text)
                  
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mobile"
                  placeholderTextColor="gray"
                  value={mobile}
                  onChangeText={(text) => setMobile(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="gray"
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleRegistration}
                >
                  {isLoading && <ActivityIndicator size="small" color="red" />}
                  <Text style={styles.registerButtonText}>Registerr</Text>
                </TouchableOpacity>

                {isLoading && <Text>Loading...</Text>}
                {registrationResponse && (
                  <Text style={{ color: "red", emity: "" }}>
                    {JSON.stringify(registrationResponse.Message)}
                  </Text>
                )}

                <Button
                  icon="arrow-left"
                  mode="contained"
                  onPress={() => navigation.goBack()}
                  buttonColor="tomato"
                >
                  Back
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </View> */}

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign Up Here</Text>
        </View>
        <Animatable.View animation="fadeInUp" style={styles.formContainer}>
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

          {/* <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
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

          {/* <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegistration}
          >
            <Text style={styles.registerButtonText}>Sign Up</Text>
          </TouchableOpacity> */}
          <Button
            icon="arrow-right"
            mode="contained"
            onPress={handleRegistration}
            buttonColor="#00b4d8"
            contentStyle={{ flexDirection: "row-reverse" }}
            style={styles.buttonRegister}
          >
            Sign Up
          </Button>

          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              color: "#495867",
              fontWeight: "700",
              fontFamily: 'Roboto-bold',
            }}
          >
            or
          </Text>

          {/* <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.registerButtonText}>Loginn</Text>
          </TouchableOpacity> */}

          <Button
            mode="contained"
            buttonColor="#00a6fb"
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            Login
          </Button>

          {isLoading && <Text>Loading...</Text>}
          {registrationResponse && (
            <Text style={{ color: "red", emity: "" }}>
              {JSON.stringify(registrationResponse.Message)}
            </Text>
          )}
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
    fontSize: 30,
    color: "#fcf6bd",
    marginBottom: 20,
    fontWeight: "700",
    fontFamily: 'Roboto-bold',
  },
  formContainer: {
    // backgroundColor: "#fcf6bd",
    backgroundColor:"#F5F7F8",
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


  // 
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
export default RegistrationPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "lightblue",
//     justifyContent: "center",
//     // alignItems: "center",
//   },
//   header: {
//     //marginBottom: 20,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//   },
//   commontextContainer: {
//     marginTop: "20%",
//     //transform: [{ rotate: '-15deg' }]
//   },

//   commonText: {
//     fontSize: 35,
//     // fontWeight: "bold",
//     color: "white",
//     marginLeft: 30,
//     //marginRight: "50%",
//   },

//   content: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   imageContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
//   image: {
//     width: 120,
//     height: 120,
//     resizeMode: "cover",
//   },
//   form: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#cae9ff",
//     padding: 50,
//     margin: 10,
//     borderRadius: 20,
//     // paddingHorizontal: 20,
//   },
//   input: {
//     height: 40,
//     // backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     backgroundColor: "white",
//     marginBottom: 10,
//     color: "black",
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     width: 350,
//     alignSelf: "center",
//   },
//   registerButton: {
//     flexDirection: "row",
//     padding: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "60%",
//     backgroundColor: "#ffe66d",
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 15,
//     alignItems: "center",
//     alignSelf: "center",
//     marginBottom: 16,
//   },
//   registerButtonText: {
//     fontSize: 15,
//     //fontWeight: 'bold',
//     color: "#5c677d",
//     fontWeight: "bold",
//   },

//   alredy: {
//     marginTop: 20, // Adjust the margin as needed
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "white",
//     textAlign: "center",
//     color: "black",
//   },
// });

