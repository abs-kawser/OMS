import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ProductList() {
  const rainbowColors = ['#fdd85d', '#fdd85d', '#219ebc', '#FFC300', '#219ebc']



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
  ];
  return (
    <View style={styles.container}>
    <Text style={styles.header}>Product List</Text>
    {products.map((product, index) => (
      <View key={index} 
      
      //style={styles.productCard}
      style={[
        styles.productCard,
        { backgroundColor: rainbowColors[index % rainbowColors.length] }, // Apply a background color
      ]}
      
      >
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productInfo}>Product Code: {product.productCode}</Text>
        <Text style={styles.productInfo}>Price: ${product.productPrice.toFixed(2)}</Text>
        <Text style={styles.tradeLicense}>Trade License: {product.tradeLicense}</Text>
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productInfo: {
    marginTop: 8,
  },
  tradeLicense: {
    marginTop: 8,
    color: 'green', // You can customize the color as needed
  },
});