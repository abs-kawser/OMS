import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CustomerList() {

  const cardColors = ['#219ebc', '#FFC300', '#219ebc', '#fdd85d', '#fdd85d'];

  const customers = [
    {
      name: "John Doe",
      customerId: 1,
      additionalInfo: "Regular customer",
    },
    {
      name: "Alice Johnson",
      customerId: 2,
      additionalInfo: "Preferred customer",
    },
    {
      name: "Bob Smith",
      customerId: 3,
      additionalInfo: "VIP customer",
    },
    {
      name: "Eve Adams",
      customerId: 4,
      additionalInfo: "New customer",
    },
  ];

  return (
    <View style={styles.container}>
      {customers.map((customer, index) => (
        <View key={index} 
        style={[
          styles.card,
          { backgroundColor: cardColors[index % cardColors.length] }, // Apply a background color
        ]}
        >
          <Text style={styles.name}>{customer.name}</Text>
          <Text style={styles.customerId}>
            Customer ID: {customer.customerId}
          </Text>
          <Text style={styles.additionalInfo}>{customer.additionalInfo}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    elevation: 2, // Add shadow for Android
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  customerId: {
    color: "gray",
  },
  additionalInfo: {
    marginTop: 8,
  },
});

//add something for git 
//check 