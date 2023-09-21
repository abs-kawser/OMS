import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import base64 from "base-64";
import { fetchProductData } from "../Api/ProductListApi";

export default function ProductList() {
  const rainbowColors = ["#9bf6ff", "#f3ffbd"];

  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  //filter part
  const [filteredData, setFilteredData] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    // Filter data based on the search term
    const filtered = products.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  
//fetch api from Api folder 
  useEffect(() => {
    const getProductList = async () => {
      try {
        const productList = await fetchProductData(setIsLoading);
        // setProducts(productList);

        setFilteredData(productList);
        setProducts(productList);
        setIsLoading(false);
      } catch (error) {
        // Handle the error gracefully
        console.error("Error fetching product list:", error);
      }
    };

    getProductList();

    //fetchProductData();
  }, []);

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
            <Text style={styles.productName}>Name:{product.Name}</Text>
            <Text style={styles.productInfo}>
              ProductCode:{product.ProductCode}
            </Text>

            <Text style={styles.productInfo}>
              Product Category: {product.ProductCategory}
            </Text>
            <Text style={styles.productInfo}>Price: ${product.MRP}</Text>
            <Text style={styles.tradeLicense}>
              Trade License: {product.ProductFamilyName}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* total */}
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>
          Total: {filteredData ? filteredData.length : data.length}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productCard: {
    marginLeft: 22,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderRadius: 5,
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










// ============Fetch Api manualy ==================\\
// //fetch api
  // const fetchProductData = async () => {
  //   try {
  //     const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
  //     const response = await fetch(`${BASE_URL}/api/ProductApi/GetAllProduct`, {
  //       headers: {
  //         Authorization: authHeader,
  //       },
  //     });
  //     const jsonData = await response.json();
  //     //console.log(JSON.stringify(jsonData, null, 2));
  //     //await AsyncStorage.setItem('ApprovalSummary', JSON.stringify(jsonData));
  //     setData(jsonData);
  //     setFilteredData(jsonData);
  //     setIsLoading(false);
  //     //return jsonData;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setIsLoading(false);
  //     // setIsLoading(false);
  //     throw error;
  //   }
  // };