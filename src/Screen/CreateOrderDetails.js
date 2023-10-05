import React, { useState, useMemo, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { fetchProductData } from "../Api/ProductListApi";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useLogin } from "../Context/LoginProvider";
import { Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { fetchOrderInfoData } from "../Api/OrderInfo";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import base64 from "base-64";

import LottieView from "lottie-react-native"; // Import LottieView

const CreateOrderDetails = ({ route }) => {
  const data = route.params?.data;

  console.log("this create order data ", data.OrderNo);

  const navigation = useNavigation();

  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;

  const [showProductData, setShowProductData] = useState(true);
  const [showOrderData, setShowOrderData] = useState(false);

  const [productQuantities, setProductQuantities] = useState({});
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Add a state variable to keep track of selected products
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  //console.log("selectedProductIds:", selectedProductIds);
  // Add a state variable to store the search term
  const [searchTerm, setSearchTerm] = useState("");
  const [orderQuantities, setOrderQuantities] = useState({});
  console.log(`Quantities`, orderQuantities);

  const [orderNo, setOrderNo] = useState(""); // Initialize with an empty string
  console.log("check order No ", orderNo);

  const [isLoadingProductData, setIsLoadingProductData] = useState(true);

  // Api calling  related work
  // useEffect(() => {
  //   const getProductList = async () => {
  //     try {
  //       const productList = await fetchProductData(setIsLoading);
  //       // setProducts(productList);

  //       //setFilteredData(productList);
  //       setProducts(productList);
  //       setIsLoading(false);
  //     } catch (error) {
  //       // Handle the error gracefully
  //       console.error("Error fetching product list:", error);
  //     }
  //   };

  //   getProductList();
  // }, []);

  useEffect(() => {
    // Check if data is already in AsyncStorage
    const getProductList = async () => {
      try {
        const storedData = await AsyncStorage.getItem("ProductList");
        if (storedData) {
          setProducts(JSON.parse(storedData));
          setIsLoadingProductData(false);
        } else {
          // Data not in AsyncStorage, fetch from API
          try {
            const jsonData = await fetchProductData();
            setProducts(jsonData);
            setIsLoadingProductData(false);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } catch (error) {
        console.error("Error reading stored data:", error);
      } finally {
        setIsLoadingProductData(false); // Set loading to false when fetch is complete
      }
    };

    // Call the function to check stored data or fetch from API
    getProductList();
  }, []);

  const handleProductButtonPress = () => {
    setShowProductData(true);
    setShowOrderData(false);
  };

  //old code when check box useing and its perfetcly working
  // const handleOrderButtonPress = () => {
  // setShowProductData(false);
  // setShowOrderData(true);
  // const updatedOrderQuantities = {};
  // selectedProductIds.forEach((productId) => {
  //   updatedOrderQuantities[productId] = productQuantities[productId] || 0;
  // });

  // setOrderQuantities(updatedOrderQuantities);
  // console.log(updatedOrderQuantities);
  // };

  const handleOrderButtonPress = () => {
    setShowProductData(false);
    setShowOrderData(true);
    // Initialize an object to store updated order quantities
    const updatedOrderQuantities = {};
    // Iterate over selected products and update order quantities
    selectedProductIds.forEach((productId) => {
      const quantity = productQuantities[productId] || 0;
      if (quantity > 0) {
        updatedOrderQuantities[productId] = quantity;
      }
    });
    // Update state with the selected product IDs and order quantities
    //setSelectedProductIds(Object.keys(updatedOrderQuantities),);
    setOrderQuantities(updatedOrderQuantities);
  };

  //togglecheck product
  // const toggleProductCheckbox = useMemo(() => {
  //   return (name) => {
  //     const updatedCheckedProducts = [...checkedProducts];
  //     if (updatedCheckedProducts.includes(name)) {
  //       // Product is already checked, uncheck it
  //       updatedCheckedProducts.splice(updatedCheckedProducts.indexOf(name), 1);
  //     } else {
  //       // Product is not checked, check it
  //       updatedCheckedProducts.push(name);
  //     }
  //     setCheckedProducts(updatedCheckedProducts);

  //     // Toggle the selected product IDs
  //     setSelectedProductIds((prevIds) =>
  //       updatedCheckedProducts.map(
  //         (name) => products.find((product) => product.Name === name).ProductId
  //       )
  //     );
  //   };
  // }, [checkedProducts, products]);

  //old code
  // const handleQuantityChange = (productId, text) => {
  //   if (text === "") {
  //     // If the input is empty, clear the quantity
  //     setProductQuantities((prevQuantities) => {
  //       const updatedQuantities = { ...prevQuantities };
  //       delete updatedQuantities[productId];
  //       return updatedQuantities;
  //     });
  //   } else {
  //     const value = parseInt(text, 10);
  //     if (!isNaN(value)) {
  //       setProductQuantities((prevQuantities) => ({
  //         ...prevQuantities,
  //         [productId]: value,
  //       }));
  //     }
  //   }
  // };

  // const handleQuantityChange = (productId, text) => {
  //   if (text === "") {
  //     // If the input is empty, clear the quantity
  //     setProductQuantities((prevQuantities) => {
  //       const updatedQuantities = { ...prevQuantities };
  //       delete updatedQuantities[productId];
  //       return updatedQuantities;
  //     });
  //   } else {
  //     const value = parseInt(text, 10);
  //     if (!isNaN(value)) {
  //       setProductQuantities((prevQuantities) => ({
  //         ...prevQuantities,
  //         [productId]: value,
  //       }));

  //       // If the entered quantity is greater than zero, add the productId to selectedProductIds
  //       if (value > 0) {
  //         setSelectedProductIds((prevIds) => [...prevIds, productId]);
  //       } else {
  //         // If the quantity is zero, remove the productId from selectedProductIds
  //         setSelectedProductIds((prevIds) =>
  //           prevIds.filter((id) => id !== productId)
  //         );
  //       }
  //     }
  //   }
  // };

  const handleQuantityChange = (productId, text) => {
    if (text === "") {
      // If the input is empty, clear the quantity
      setProductQuantities((prevQuantities) => {
        const updatedQuantities = { ...prevQuantities };
        delete updatedQuantities[productId];
        return updatedQuantities;
      });
    } else {
      const value = parseInt(text, 10);
      if (!isNaN(value)) {
        setProductQuantities((prevQuantities) => ({
          ...prevQuantities,
          [productId]: value,
        }));

        // If the entered quantity is greater than zero, add the productId to selectedProductIds
        if (value > 0 && !selectedProductIds.includes(productId)) {
          setSelectedProductIds((prevIds) => [...prevIds, productId]);
        } else if (value === 0 && selectedProductIds.includes(productId)) {
          // If the quantity is zero, remove the productId from selectedProductIds
          setSelectedProductIds((prevIds) =>
            prevIds.filter((id) => id !== productId)
          );
        }
      }
    }
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    selectedProductIds.forEach((productId) => {
      const selectedProduct = products.find(
        (product) => product.ProductId === productId
      );
      const quantity = productQuantities[productId] || 0;
      totalPrice += selectedProduct.MRP * quantity;
    });

    return totalPrice;
  };

  // ========================//

  // Filter products based on the search term
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // =============================================================================
  // const fetchOrderInfoData = async () => {
  //   try {

  //     const url = `${BASE_URL}/api/NewOrderApi/GetPoInfo?orderNo=${data?.OrderNo}&verId=1`;
  //     const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
  //     // Fetch data from the URL
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {

  //         Authorization: authHeader,
  //       },
  //     });
  //     //console.log("order info", response);
  //     console.log("Check data:", JSON.stringify(response, null, 2));
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //     throw error;
  //   }
  // };

  // fetchOrderInfoData api

  // ${data?.OrderNo}
  const fetchOrderInfoData = async (userDetails) => {
    try {
      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);

      const response = await fetch(
        `${BASE_URL}/api/NewOrderApi/GetPoInfo?  =${data?.OrderNo}&verId=1`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      const jsonData = await response.json();

      navigation.navigate("Order Info", { data: jsonData });

      // await AsyncStorage.setItem('AttendanceSummary', JSON.stringify(jsonData));
      console.log("data xyz", JSON.stringify(jsonData, null, 2));
    } catch (error) {
      console.error("Error fetching data:", error);
      // setIsLoading(false);
      throw error;
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     // Assuming you have the order number in route.params.data.OrderNo
  //     const orderNumber = route.params?.data?.OrderNo;

  //     if (orderNumber) {
  //       const orderInfo = await fetchOrderInfoData(orderNumber);
  //       // Do something with the fetched orderInfo
  //       console.log("Order Info:", orderInfo);
  //       navigation.navigate("Order Info", );
  //     } else {
  //       // Handle the case where there is no order number
  //       console.error("No valid order number found");
  //     }
  //   } catch (error) {
  //     // Handle any errors that may occur during the fetch or submission
  //     console.error("Error handling submission:", error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.userInformation}>
        <Text style={styles.userText1}> Name:{userDetails.FullName}</Text>
        <Text style={styles.userText2}> UserID :{userDetails.EmpId}</Text>
      </View>

      {/* implement search  part*/}

      <View style={styles.searchBox}>
        <View style={styles.inputContainerx}>
          <TextInput
            style={styles.inputx}
            placeholder="Search..."
            onChangeText={(text) => setSearchTerm(text)}
          />
          <Icon
            name="search" // Font Awesome icon name
            size={24}
            style={styles.iconx}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleProductButtonPress}>
            Product List
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText} onPress={handleOrderButtonPress}>
            Order Details
          </Text>
        </TouchableOpacity>
      </View>

      <>
        {isLoadingProductData ? (
          <View style={styles.loadingContainer}>
            {/* <ActivityIndicator size="large" color="#0077b6" /> */}
            <LottieView
              source={require("../../Lottie/animation_ln8n5kbe.json")} // Replace with your animation file path
              autoPlay
              loop
              style={styles.lottiContainer}
            />
          </View>
        ) : (
          <ScrollView>
            <>
              {showProductData && (
                //key id
                <View style={styles.dataContainer}>
                  {filteredProducts.map((product, index) => (
                    <View style={styles.row} key={product.ProductId}>
                      <View style={styles.infoContainer}>
                        <Text style={styles.name}>{product.Name} </Text>

                        <View style={{ flexDirection: "row", gap: 10 }}>
                          <Text style={styles.price}>price :{product.MRP}</Text>
                          <Text style={styles.price}>
                            PackSize :{product.PackSize}
                          </Text>
                        </View>
                      </View>

                      {/* quantity   part  start  */}
                      <View style={styles.quantityContainer}>
                        <View style={styles.containerx}>
                          <View style={styles.inputContainer}>
                            <TextInput
                              placeholder="QTY"
                              style={styles.input}
                              keyboardType="numeric"
                              value={
                                productQuantities[product.ProductId]
                                  ? productQuantities[
                                      product.ProductId
                                    ].toString()
                                  : ""
                              }
                              onChangeText={(text) =>
                                handleQuantityChange(product.ProductId, text)
                              }
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </>

            <>
              {showOrderData && (
                <View style={styles.dataContainer}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Name</Text>
                    <Text style={styles.headerText}>Quantity</Text>
                    <Text style={styles.headerText}>Amount</Text>
                    <Text style={styles.headerText}>Action</Text>
                  </View>
                  {selectedProductIds.map((productId) => {
                    const selectedProduct = products.find(
                      (product) => product.ProductId === productId
                    );
                    console.log("productId:", productId);
                    console.log("selectedProduct:", selectedProduct);
                    // Check if the product has a quantity value
                    const quantity = productQuantities[productId] || 0;
                    if (quantity > 0) {
                      return (
                        <View style={styles.tableRow} key={productId}>
                          <Text style={styles.cellText} numberOfLines={2}>
                            {selectedProduct.Name}
                          </Text>

                          <Text style={styles.cellText}>{quantity}</Text>

                          <Text style={styles.cellText}>
                            {selectedProduct.MRP * quantity}
                          </Text>
                          <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => console.log("Delete button pressed")}
                          >
                            <Icon name="trash" size={25} color="tomato" />
                          </TouchableOpacity>
                        </View>
                      );
                    }

                    return null;
                  })}

                  <View style={styles.btngrp}>
                    <Button>Save</Button>
                    <Button onPress={fetchOrderInfoData}>Submit</Button>
                  </View>
                </View>
              )}
            </>
          </ScrollView>
        )}
      </>

      <Text style={styles.totalPriceText}>
        Total Price: {calculateTotalPrice()}
      </Text>
    </View>
  );
};

export default CreateOrderDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   buttonContainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between", // Center the buttons vertically
//     gap: 5,
//     top: 15,
//     padding: 20,
//   },
//   dataContainer: {
//     marginTop: 20,
//   },

//   //

//   row: {
//     flexDirection: "row",
//     //justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   infoContainer: {
//     // flex: 1,
//     // flexDirection: 'row',
//     // alignItems: 'center',
//   },
//   name: {
//     fontSize: 12,

//     marginRight: 10,
//   },
//   price: {
//     fontSize: 16,
//     color: "green",
//   },
//   quantityContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   underline: {
//     textDecorationLine: "underline",
//   },
//   checkboxContainer: {
//     flex: 0.2,
//     alignItems: "flex-end",
//   },

//   // ===================//
//   containerx: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   label: {
//     fontSize: 16,
//     marginRight: 10,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   button: {
//     fontSize: 24,
//     paddingHorizontal: 10,
//   },
//   input: {
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "gray",
//     padding: 5,
//     minWidth: 40,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInformation: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  userText1: {
    fontSize: 16,
  },
  userText2: {
    fontSize: 16,
    color: "#168aad",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    //marginTop: 15,
    padding: 10,
  },
  dataContainer: {
    marginTop: 20,
  },

  button: {
    width: "50%", // Set width to 50% of screen width
    backgroundColor: "#3498db",
    padding: 10,
  },
  button2: {
    width: "50%", // Set width to 50% of screen width
    backgroundColor: "#e74c3c",
    padding: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    //justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
  },
  name: {
    fontSize: 15,
    marginRight: 10,
    color: "gray",
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,

    color: "#403d39",
  },
  quantityContainer: {
    flex: 1,
    //justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },

  checkboxContainer: {
    flex: 0.2,
    alignItems: "flex-end",
  },
  containerx: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  // button: {
  //   fontSize: 24,
  //   paddingHorizontal: 10,
  // },
  input: {
    fontSize: 13,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    minWidth: 40,
  },
  totalPriceText: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  searchBox: {
    // marginLeft: 50,
    alignSelf: "center",
    marginVertical: 10,
    background: "#F4F4F4",
  },

  inputContainerx: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    padding: 5,
    marginLeft: 5,
    borderRadius: 50,
  },
  inputx: {
    flex: 1,
    height: 40,
    padding: 10,
    color: "#80A896",
  },
  iconx: {
    marginRight: 10,
  },
  // ===============================
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f2f2f2", // Header background color
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Border color
  },
  cellText: {
    fontSize: 13,
    flex: 1,
  },
  quantity: {
    marginLeft: 20,
  },

  actionButton: {
    backgroundColor: "#dee2e6", // Button background color
    padding: 5,
    borderRadius: 5,
  },
  actionText: {
    color: "white", // Button text color
    fontWeight: "bold",
  },
  // button design for order details
  btngrp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    gap: 5,
  },
  loadingContainer: {
    alignSelf: "center",
    flex: 1,
    // justifyContent:"center",
    // alignItems:"center"
  },
  lottiContainer: {
    height: 50,
    width: 50,
  },
});

// const toggleProductCheckbox = (name) => {
//   //old code
//   const updatedCheckedProducts = [...checkedProducts];
//   if (updatedCheckedProducts.includes(name)) {
//     // Product is already checked, uncheck it
//     updatedCheckedProducts.splice(updatedCheckedProducts.indexOf(name), 1);
//   } else {
//     // Product is not checked, check it
//     updatedCheckedProducts.push(name);
//   }
//   setCheckedProducts(updatedCheckedProducts);
// };

// =======================================
// {showOrderData && (

//   <View style={styles.dataContainer}>
//     {selectedProductIds.map((productId) => {
//       const selectedProduct = products.find(
//         (product) => product.ProductId === productId
//       );
//       return (
//         <View style={styles.row} key={selectedProduct.ProductId}>
//           <View style={styles.infoContainer}>
//             <Text style={styles.name}>{selectedProduct.Name}</Text>
//           </View>
//         </View>
//       );
//     })}
//   </View>
// )

// }

// ========checkbos when use

/* {showOrderData && (
            <View style={styles.dataContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Namee</Text>
                <Text style={styles.headerText}>Quantityy</Text>
                <Text style={styles.headerText}>Amountt</Text>
                <Text style={styles.headerText}>Actionn</Text>
              </View>
              {selectedProductIds.map((productId) => {
                const selectedProduct = products.find(
                  (product) => product.ProductId === productId
                ); 

                console.log("productId:", productId);
                console.log("selectedProduct:", selectedProduct);

                const quantity = orderQuantities[productId] || 0;
                const amount = selectedProduct.MRP * quantity;
                return (
                  <View style={styles.tableRow} key={selectedProduct.ProductId}>
                    <Text style={styles.cellText}>{selectedProduct.Name}</Text>
                    <Text style={styles.cellText}>{quantity}</Text>
                    <Text style={styles.cellText}>{amount}</Text>
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionText}>Deletee</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )} */
