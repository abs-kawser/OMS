import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function CustomerList() {
  const cardColors = ["#219ebc", "#FFC300", "#219ebc", "#fdd85d", "#fdd85d"];

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

  //implement search logic
  const [filteredData, setFilteredData] = useState(customers);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(filteredData);

  useEffect(() => {
    // Filter data based on the search term
    const filtered = customers.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  return (
    <>
      {/* implement search  part*/}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          onChangeText={(text) => setSearchTerm(text)}
        />
        <Icon
          name="search" // Font Awesome icon name
          size={24}
          style={styles.icon}
        />
      </View>

      <ScrollView>
        <View style={styles.container}>
          {filteredData.map((customer, index) => (
            <View
              key={index}
              style={[
                styles.card,
                { backgroundColor: cardColors[index % cardColors.length] }, // Apply a background color
              ]}
            >
              <Text style={styles.name}>{customer.name}</Text>
              <Text style={styles.customerId}>
                Customer ID: {customer.customerId}
              </Text>
              <Text style={styles.additionalInfo}>
                {customer.additionalInfo}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* total */}
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>Total: {customers.length}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },

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
  bottomTextContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#caf0f8",
    padding: 2,
    alignSelf: "center",
  },
  bottomText: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

//add something for git
//check
