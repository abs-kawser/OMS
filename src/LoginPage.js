import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
  };

  const handleRegisterNow = () => {
    // Add navigation to the registration page or any other action
  };

  return (
   
      <View style={styles.container}>
         <SafeAreaView> 
        <View style={styles.header}>
          <Text style={styles.headerText}>OMSS</Text>
        </View>

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
          placeholder="User ID"
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonTextX}>Loginn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerNow}
          onPress={handleRegisterNow}
        >
          <Text style={styles.registerNowText}>Register Now</Text>
        </TouchableOpacity>
        </SafeAreaView>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
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
  


    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
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
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default LoginPage;
