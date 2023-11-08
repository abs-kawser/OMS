import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  FlatList
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import base64 from "base-64";
import { fetchProductData } from "../Api/ProductListApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

export default function ProductList() {
  const rainbowColors = ["#9bf6ff", "#f3ffbd"];

  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);
  //filter part
  const [filteredData, setFilteredData] = useState([products]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on the search term
  useEffect(() => {
    const filtered = products.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  useEffect(() => {
    // Function to fetch data from AsyncStorage
    const fetchDataFromStorage = async () => {
      try {
        const storedData = await AsyncStorage.getItem("ProductList");
        if (storedData !== null) {
          // Data was found in AsyncStorage, parse and set it
          const parsedData = JSON.parse(storedData);
          setProducts(parsedData);
          setFilteredData(parsedData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    fetchDataFromStorage();

    const getProductList = async () => {
      try {
        const productList = await fetchProductData(setIsLoading);
        setFilteredData(productList);
        setProducts(productList);
        setIsLoading(false);
      } catch (error) {
        // console.error("Error fetching product list:", error);
      }
    };

    getProductList();
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

      {isLoading ? (
        // <ActivityIndicator
        //   size="large"
        //   color="#0000ff"
        //   // colors={COLORS.primary}
        //   style={styles.activityIndicator}
        // />

        <View style={styles.loadingContainer}>
          {/* <ActivityIndicator size="large" color="#0077b6" /> */}
          <LottieView
            source={require("../../Lottie/Animation8.json")} // Replace with your animation file path
            autoPlay
            loop
            style={styles.lottiContainer}
          />
        </View>
      ) : (
        // <ScrollView style={{flex:1}}>
        //   <Text style={styles.header}>Product List</Text>

        //   {filteredData.map((product, index) => (
        //     <View
        //       key={index}
        //       style={[
        //         styles.productCard,
        //         {
        //           backgroundColor: rainbowColors[index % rainbowColors.length],
        //         },
        //       ]}
        //     >
        //       <View style={styles.textContainer}>
        //         <Text style={styles.productName}>{product.Name}</Text>
        //         <Text style={styles.productInfo}>({product.ProductCode})</Text>
        //       </View>

        //       {/* <Text style={styles.productName}>Name:{product.Name}</Text>
        //     <Text style={styles.productInfo}>
        //       ProductCode:{product.ProductCode}
        //     </Text> */}

        //       <Text style={styles.Category}>
        //         Category: {product.ProductCategory}
        //       </Text>

        //       <View style={styles.textContainer}>
        //         <Text style={styles.productInfo}>
        //           Trade Price : Tk {product.MRP}
        //         </Text>
        //         <Text style={styles.tradeLicense}>
        //           Pack Size: {product.PackSize}
        //         </Text>
        //       </View>
        //     </View>
        //   ))}
        // </ScrollView>

        (<FlatList
          style={{ flex: 1 }}
          data={filteredData}
          keyExtractor={(product, index) => index.toString()}
          ListHeaderComponent={<Text style={styles.header}>Product List</Text>}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.productCard,
                {
                  backgroundColor: rainbowColors[index % rainbowColors.length],
                },
              ]}
            >
              <View style={styles.textContainer}>
                <Text style={styles.productName}>{item.Name}</Text>
                <Text style={styles.productInfo}>({item.ProductCode})</Text>
              </View>

              <Text style={styles.Category}>
                Category: {item.ProductCategory}
              </Text>

              <View style={styles.textContainer}>
                <Text style={styles.productInfo}>
                  Trade Price : Tk {item.MRP}
                </Text>
                <Text style={styles.tradeLicense}>
                  Pack Size: {item.PackSize}
                </Text>
              </View>
            </View>
          )}
        />)

      )}

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
  // mainContainer:{
  //   flex: 1,
  // },

  container: {
    flex: 1,
    padding: 16,
    borderRadius: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 25,
  },
  productCard: {
    marginLeft: 22,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    elevation: 5,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    color: "black",
    // fontWeight: "bold",
  },
  productInfo: {
    color: "black",
    // marginTop: 8,
  },
  tradeLicense: {
    color: "black", // You can customize the color as needed
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
  textContainer: {
    flexDirection: "row",
    gap: 10,
  },
  Category: {
    color: "black",
    marginTop: 8,
    marginBottom: 8,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingContainer: {
    alignSelf: "center",
    flex: 1,
    // justifyContent:"center",
    // alignItems:"center"
  },
  lottiContainer: {
    height: 50,
    width: 100,
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
