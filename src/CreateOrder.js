import { Button } from "@rneui/base";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CreateOrder() {
  const [client, setClient] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [note, setNote] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Client:Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter client name"
        value={client}
        onChangeText={(text) => setClient(text)}
      />

      <Text style={styles.label}>Order Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter order date"
        value={orderDate}
        onChangeText={(text) => setOrderDate(text)}
      />

      <Text style={styles.label}>Delivery Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter delivery date"
        value={deliveryDate}
        onChangeText={(text) => setDeliveryDate(text)}
      />

      <Text style={styles.label}>Note:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        placeholder="Enter notes"
        value={note}
        onChangeText={(text) => setNote(text)}
      />

      <TouchableOpacity
        style={styles.nextButton}
        //onPress={handleNextButtonPress}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#0096c7",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },

  nextButton: {
    backgroundColor: "#0096c7", // Light blue background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "flex-end", // Align button to the left
    marginTop: "auto",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white", // Text color
  },
});
