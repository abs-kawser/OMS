import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput as PaperTextInput, Button } from "react-native-paper";
import { Text } from "react-native-paper";




const OrderStatus = () => {
  return (
    <View style={styles.container}>
      {/* Order Date Input */}
      <Text variant="titleMedium">Order Date</Text>
      <PaperTextInput
        mode="outlined"
        label="YYYY-MM-DD"
        placeholder="Enter order date"
        style={styles.input}
      />

      {/* Delivery Date Input */}
      <Text variant="titleMedium">Delivery Date</Text>

      <PaperTextInput
        mode="outlined"
        label="YYYY-MM-DD"
        placeholder="Enter delivery date"
        style={styles.input}
      />

      {/* Customer ID Input */}
      <Text variant="titleMedium">Customer ID</Text>

      <PaperTextInput
        mode="outlined"
        label="Customer ID"
        placeholder="Enter customer ID"
        style={styles.input}
      />

      {/* Search Button */}
      <Button mode="contained" style={styles.button}>
        Search
      </Button>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    //justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    marginBottom: 20,
    borderColor: "#0096c7",
  },
  button: {
    width: "50%",

    marginTop: 10,
    backgroundColor: "#0096c7", // Customize the button color
  },
});
