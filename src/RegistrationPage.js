// import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import Header from "../components/Header";







const RegistrationPage = () => {
  return (
    <>
      <Header />

      <ImageBackground
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="User ID"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="gray"
              secureTextEntry
            />
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Registerr</Text>
            </TouchableOpacity>

            <Text style={styles.alredy}>Alredy have an account </Text>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
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
    width: 150,
    height: 150,
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
    color: "white",
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 350,
    alignSelf: "center",
  },
  registerButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 350,
    alignSelf: "center",
  },
  registerButtonText: {
    fontSize: 16,
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
