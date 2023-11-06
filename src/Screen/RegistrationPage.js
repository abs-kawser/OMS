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



const RegistrationPage = ({navigation}) => {
  const [userId, setUserId] = useState("");
  console.log("USer id", userId);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Add more state variables as needed for handling API response and loading state
  const [isLoading, setIsLoading] = useState(false);
  const [registrationResponse, setRegistrationResponse] = useState(null);

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
      <Header />
      <View style={styles.container}>
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
                  onChangeText={(text) => setUserId(text)}
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
                {/* <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            /> */}

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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    //marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  commontextContainer: {
    marginTop: "20%",
    //transform: [{ rotate: '-15deg' }]
  },

  commonText: {
    fontSize: 35,
    // fontWeight: "bold",
    color: "white",
    marginLeft: 30,
    //marginRight: "50%",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "cover",
  },
  form: {
    flex: 1,
    padding: 10,
    backgroundColor: "#cae9ff",
    padding: 50,
    margin: 10,
    borderRadius: 20,
    // paddingHorizontal: 20,
  },
  input: {
    height: 40,
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: "white",
    marginBottom: 10,
    color: "black",
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 350,
    alignSelf: "center",
  },
  registerButton: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    backgroundColor: "#ffe66d",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  registerButtonText: {
    fontSize: 15,
    //fontWeight: 'bold',
    color: "#5c677d",
    fontWeight: "bold",
  },

  alredy: {
    marginTop: 20, // Adjust the margin as needed
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    color: "black",
  },
});

export default RegistrationPage;
