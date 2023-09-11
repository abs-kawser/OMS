import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function ProductList() {
  const rainbowColors = ["#fdd85d", "#fdd85d", "#219ebc", "#FFC300", "#219ebc"];

  const products = [
    {
      name: "Product 1",
      productCode: "P001",
      productPrice: 29.99,
      tradeLicense: "TL-12345",
    },
    {
      name: "Product 2",
      productCode: "P002",
      productPrice: 49.99,
      tradeLicense: "TL-67890",
    },
    {
      name: "Product 3",
      productCode: "P003",
      productPrice: 19.99,
      tradeLicense: "TL-54321",
    },
    {
      name: "Product 4",
      productCode: "P004",
      productPrice: 39.99,
      tradeLicense: "TL-98765",
    },
    {
      name: "Product 3",
      productCode: "P003",
      productPrice: 19.99,
      tradeLicense: "TL-54321",
    },
    {
      name: "Product 4",
      productCode: "P004",
      productPrice: 39.99,
      tradeLicense: "TL-98765",
    },
    {
      name: "Product 3",
      productCode: "P003",
      productPrice: 19.99,
      tradeLicense: "TL-54321",
    },
    {
      name: "Product 4",
      productCode: "P004",
      productPrice: 39.99,
      tradeLicense: "TL-98765",
    },
  ];

  //implement search logic 
  const [filteredData, setFilteredData] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Filter data based on the search term
    const filtered = products.filter((item) =>
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
        <Text style={styles.header}>Product List</Text>

        {filteredData.map((product, index) => (
          <View
            key={index}
            style={[
              styles.productCard,
              {
                backgroundColor: rainbowColors[index % rainbowColors.length],
              },
            ]}
          >
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productInfo}>
              Product Code: {product.productCode}
            </Text>
            <Text style={styles.productInfo}>
              Price: ${product.productPrice.toFixed(2)}
            </Text>
            <Text style={styles.tradeLicense}>
              Trade License: {product.tradeLicense}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* total */}
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>Total: {products.length}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productInfo: {
    marginTop: 8,
  },
  tradeLicense: {
    marginTop: 8,
    color: "green", // You can customize the color as needed
  },

  containerx: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "blue", // You can change 'blue' to any color you like
    fontSize: 18,
    fontWeight: "normal", // You can adjust the font weight as needed
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
});
