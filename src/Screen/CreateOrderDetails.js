// =======================

import React, { useState, useMemo, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  FlatList,
  Image,
} from "react-native";
import { fetchProductData } from "../Api/ProductListApi";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useLogin } from "../Context/LoginProvider";
import { Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, PASSWORD, USERNAME, blackColor } from "../../varible";
import base64 from "base-64";

import LottieView from "lottie-react-native"; // Import LottieView
import { useCustomerInfo } from "../Context/CustomerProvider";
import TransitionLoader from "../../components/TransitionLoader";

const CreateOrderDetails = ({ route }) => {
  
  const data = route.params?.data;

  const { customerInformation, setCustomerInformation } = useCustomerInfo();

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;

  const [showProductData, setShowProductData] = useState(true);
  const [showOrderData, setShowOrderData] = useState(false);

  const [products, setProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [orderQuantities, setOrderQuantities] = useState(null);
  const [isLoadingProductData, setIsLoadingProductData] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const [totalAmount, setTotalAmount] = useState([]);
  const [quantity, setQuantity] = useState([]);

  const [hasSelectedProducts, setHasSelectedProducts] = useState(false);

  // console.log("create order page data", data?.DeliveryDate);
  // console.log("customerInformation from contex api ", customerInformation);
  // console.log("product quantities", productQuantities);
  // console.log("this is quantity value ", quantity);
  //console.log("productxx", JSON.stringify(products, null, 2))
  // console.log("selected  ProductIds:", selectedProductIds);
  //console.log(`orderQuantities`, orderQuantities);
  // console.log("total ammount",totalAmount);
  // console.log(
  //   "selected Products item :",
  //   JSON.stringify(selectedProduct, null, 2)
  // );

  // product api calling
  useEffect(() => {
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
        setIsLoadingProductData(false);
      }
    };

    // Call the function to check stored data or fetch from API
    getProductList();
  }, []);

  useEffect(() => {
    // Inside this effect, filter and set the selected products based on product IDs
    const selectedProducts = selectedProductIds.map((productId) => {
      return products.find((product) => product.ProductId === productId);
    });
    setSelectedProduct(
      selectedProducts.filter((product) => product !== undefined)
    );
  }, [selectedProductIds, products]);

  const logQuantityValues = () => {
    const quantityValues = selectedProduct.map((product) => {
      const quantity = productQuantities[product.ProductId] || 0;
      return quantity;
    });

    const totalAmountValues = selectedProduct.map((product, index) => {
      const quantity = quantityValues[index];
      return product.MRP * quantity;
    });

    setQuantity(quantityValues);
    setTotalAmount(totalAmountValues);

    // Log both quantity and totalAmount
    // console.log("Quantity:", quantityValues);
    // console.log("Total Amount:", totalAmountValues);
  };

  // =====================
  const handleProductButtonPress = () => {
    setShowProductData(true);
    setShowOrderData(false);

    // setShowLoader(true);
    // setTimeout(() => {
    //   setShowLoader(false);
    // }, 1000);
  };

  //=================== order Details  part=================
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

    logQuantityValues();
    setOrderQuantities(updatedOrderQuantities);
    // setIsLoading(false);
  };

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

  // Filter products based on the search item
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // Filter products based on the search item
  // const filteredProducts = useMemo(() => {
  //   if (searchTerm.trim() === "") {
  //     // If the search term is empty, show all products
  //     return products;
  //   } else {
  //     // If there is a search term, filter based on it
  //     return products.filter((product) =>
  //       product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }
  // }, [products, searchTerm]);

  //delete product
  const handleDeleteProduct = (productId) => {
    // Remove the product from selectedProductIds
    setSelectedProductIds((prevIds) =>
      prevIds.filter((id) => id !== productId)
    );

    // Remove the product quantity from productQuantities
    setProductQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      // delete updatedQuantities[productId];
      return updatedQuantities;
    });

    // Check if there are any selected products left
    setHasSelectedProducts(selectedProductIds.length > 0);
  };

  // ===================== main api calling =============================
  const transformedOrderDetails = selectedProduct.map((product, index) => {
    return {
      ProductId: product.ProductId,
      Quantity: quantity[index], // You can set the desired quantity here
      UnitPrice: product.MRP, // Use the trade price or any other desired price
      Status: 0, // Set the desired status
    };
  });

  const fetchCreatenewOrderData = async () => {
    
    if (!orderQuantities || Object.keys(orderQuantities).length === 0) {
      console.log("No data in orderQuantities. Cannot submit.");
      ToastAndroid.show("No data in order details", ToastAndroid.LONG);
      return;
    }

    const requestData = {
      OrderDetails: transformedOrderDetails,
      CustomerId: data?.CustomerId,
      OrderDate: data?.OrderDate,
      DeliveryDate: data?.DeliveryDate,
      EntryBy: data?.EntryBy,
      Note: data?.Note,
      TerritoryId: data?.TerritoryId,
    };
    console.log(
      "Posting Create order Api  data:",
      JSON.stringify(requestData, null, 2)
    );
    const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
    try {
      const response = await fetch(
        `${BASE_URL}/api/NewOrderApi/CreateNewOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
          },
          body: JSON.stringify(requestData),
        }
      );
      console.log(response);
      if (response.status === 200) {
        const result = await response.json();
        // setOutput(result);
        console.log("this is result", JSON.stringify(result, null, 2));
        // navigation.navigate("Order Info");
        navigation.navigate("Order Info", {
          orderNo: result.OrderNo, // Pass OrderNo as a parameter
        });
        Toast.show({
          text1: result.Status,
          type: "success",
        });
      } else {
        // Handle errors here if needed
        console.error("API request failed with status code:", response.status);
        ToastAndroid.show("Failed to create order", ToastAndroid.LONG);
      }
    } catch (error) {}
  };
  // ======================= main api calling end =========================\\

  // ============== Draft save functionality =================\\
  const draftTransformedOrderDetails = selectedProduct.map((product, index) => {
    return {
      ProductId: product.ProductId,
      Quantity: quantity[index], // You can set the desired quantity here
      UnitPrice: product.MRP, // Use the trade price or any other desired price
      Status: 0, // Set the desired status
      TotalAmount: totalAmount[index],
      ProductName: product.Name,
    };
  });

  const handleDraftSave = async () => {
    if (!orderQuantities || Object.keys(orderQuantities).length === 0) {
      console.log("No data in orderQuantities. Cannot submit.");
      ToastAndroid.show("No data in order details", ToastAndroid.LONG);
      return;
    }

    const requestData = {
      OrderDetails: draftTransformedOrderDetails,
      CustomerId: data?.CustomerId,
      OrderDate: data?.OrderDate,
      DeliveryDate: data?.DeliveryDate,
      EntryBy: data?.EntryBy,
      Note: data?.Note,
      TerritoryId: data?.TerritoryId,
      CustomerName: customerInformation?.Name,
      CustomerAddress: customerInformation?.Address,
    };

    console.log(
      "this is draft request data",
      JSON.stringify(requestData, null, 2)
    );

    try {
      // Retrieve the existing data from AsyncStorage
      const existingData = await AsyncStorage.getItem("customerInformation");
      console.log(
        "existing data in async storage",
        JSON.stringify(existingData, null, 2)
      );

      // Parse the existing data (or initialize an empty array)
      const customerInfoArray = existingData ? JSON.parse(existingData) : [];
      // Add the current customerInformation to the array
      customerInfoArray.push(requestData);
      // Save the updated array to AsyncStorage
      await AsyncStorage.setItem(
        "customerInformation",
        JSON.stringify(customerInfoArray)
      );

      navigation.navigate("Darft Screen");

      // Alert.alert('Data saved successfully.');
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.userInformation}>
        <Text style={styles.userText1}>{customerInformation?.Name}</Text>
        <Text style={{ color: "black" }}>
          ({customerInformation?.CustomerId})
        </Text>
      </View>

      {/* search part*/}
      {/* <View style={styles.searchBox}>
<View style={styles.inputContainerx}>
<TextInput
style={styles.inputx}
placeholder="Search..."
onChangeText={(text) => setSearchTerm(text)}
/>
<Icon name="search" size={24} style={styles.iconx} />
</View>
</View> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={{ width: "50%" }}>
          <Button
            style={styles.button}
            onPress={handleProductButtonPress}
            // disabled={isLoading} // Disable the button when loading
          >
            Product List
          </Button>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: "50%" }}>
          <Button color="#2E97A7" onPress={handleOrderButtonPress}>
            Order Details
          </Button>
        </TouchableOpacity>
      </View>

      {/* {showLoader && <TransitionLoader />} */}

      <>
        {isLoadingProductData ? (
          <View style={styles.loadingContainer}>
            {/* <ActivityIndicator size="large" color="#0077b6" /> */}
            {/* Replace with your animation file path */}
            <LottieView
              source={require("../../Lottie/animation_ln8n5kbe.json")}
              autoPlay
              loop
              style={styles.lottiContainer}
            />
          </View>
        ) : (
          <ScrollView>
            {/* Product data  */}
            <>
              {showProductData && (
                <View style={styles.dataContainer}>
                  <View style={styles.searchBox}>
                    <View style={styles.inputContainerx}>
                      <TextInput
                        style={styles.inputx}
                        placeholder="Search..."
                        onChangeText={(text) => setSearchTerm(text)}
                      />
                      <Icon name="search" size={24} style={styles.iconx} />
                    </View>
                  </View>

                  <FlatList
                    data={filteredProducts}
                    keyExtractor={(product) => product.ProductId.toString()}
                    renderItem={({ item: product }) => (
                      <View style={styles.row}>
                        <View style={styles.infoContainer}>
                          <Text style={styles.name}>{product.Name}</Text>

                          <View style={{ flexDirection: "row", gap: 10 }}>
                            <Text style={styles.price}>
                              Price: {product.MRP}
                            </Text>
                            <Text style={styles.price}>
                              Pack Size: {product.PackSize}
                            </Text>
                          </View>
                        </View>

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
                    )}
                  />
                </View>
              )}
            </>

            {/* Order  data  */}
      <>
        {showOrderData && (
          <View style={styles.dataContainer}>
            <>
              <View style={styles.tableHeader}>
                <Text style={styles.headerTextForname}>Name</Text>

                <Text style={[styles.headerText]}>Qty</Text>

                <View style={{ marginLeft: 20 }}>
                  <Text style={[styles.headerText]}>Price </Text>
                </View>

                <Text style={styles.headerText}></Text>
              </View>
              {selectedProduct.map((specificProduct) => {
                const quantity =
                  productQuantities[specificProduct.ProductId] || 0;
                if (quantity > 0) {
                  return (
                    <View
                      style={styles.tableRow}
                      key={specificProduct.ProductId}
                    >
                      <Text style={styles.cellTextForName}>
                        {specificProduct.Name}
                      </Text>

                      <Text style={[styles.cellText, styles.quantity]}>
                        {quantity}
                      </Text>

                      <Text style={styles.cellText}>
                        {specificProduct.MRP * quantity}
                      </Text>

                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() =>
                          handleDeleteProduct(specificProduct.ProductId)
                        }
                      >
                        <Icon
                          style={{
                            height: 25,
                            width: 25,
                            resizeMode: "contain",
                          }}
                          name="trash"
                          size={20}
                          color="#212529"
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }

                return null;
              })}
            </>

            <View style={styles.btngrp}>
              <Button color="#2E97A7" onPress={handleDraftSave}>
                Save
              </Button>
              <Button color="#2E97A7" onPress={fetchCreatenewOrderData}>
                Submit
              </Button>
            </View>
          </View>
        )}
      </>
          </ScrollView>
        )}
      </>

      <Text style={styles.totalPriceText}>
        Total Price: {calculateTotalPrice()} Tk
      </Text>
    </View>
  );
};
export default CreateOrderDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   userInformation: {
//     flexDirection: "row",
//     justifyContent: "center",
//     textAlign: "center",
//     alignItems: "center",
//     marginTop: 10,
//     gap: 3,
//   },
//   userText1: {
//     fontSize: 16,
//     color: "black",
//     // marginTop:10,
//   },
//   userText2: {
//     fontSize: 16,
//     color: "#168aad",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 10,
//   },
//   dataContainer: {
//     // flex:1
//     // marginTop: 20,
//   },

//   button: {
//     width: "50%",
//     backgroundColor: "#3498db",
//     padding: 10,
//   },
//   button2: {
//     width: "50%",
//     backgroundColor: "#e74c3c",
//     padding: 10,
//   },
//   buttonText: {
//     color: "white",
//     textAlign: "center",
//   },

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
//     flex: 1,
//     flexDirection: "column",
//   },
//   name: {
//     fontSize: 15,
//     marginRight: 10,
//     color: "black",
//     fontWeight: "bold",
//   },
//   price: {
//     fontSize: 16,
//     color: "#403d39",
//     fontWeight: "600",
//     fontFamily: "Roboto-bold",
//   },
//   quantityContainer: {
//     flex: 1,
//     //justifyContent: "space-between",
//     alignItems: "flex-end",
//     paddingHorizontal: 20,
//   },

//   checkboxContainer: {
//     flex: 0.2,
//     alignItems: "flex-end",
//   },
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

//   input: {
//     fontSize: 15,
//     borderWidth: 1,
//     borderColor: "#0b090a",
//     padding: 7,
//     minWidth: 40,
//     // borderBottomWidth:1,
//   },
//   totalPriceText: {
//     color: "black",
//     textAlign: "center",
//     fontSize: 15,
//     fontWeight: "bold",
//   },
//   searchBox: {
//     // marginLeft: 50,
//     alignSelf: "center",
//     marginVertical: 10,
//     background: "#F4F4F4",
//   },

//   inputContainerx: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "80%",
//     borderColor: "black",
//     borderWidth: 1,
//     margin: 5,
//     padding: 5,
//     marginLeft: 5,
//     borderRadius: 50,
//   },
//   inputx: {
//     flex: 1,
//     height: 40,
//     padding: 10,
//     color: "#0b090a",
//   },
//   iconx: {
//     marginRight: 10,
//   },
//   // =============== table =========//
//   tableHeader: {
//     flexDirection: "row",
//     padding: 10,
//     marginHorizontal: 10,
//     backgroundColor: "lightgray",
//   },
//   headerText: {
//     fontSize: 17,
//     color: blackColor,
//     textAlign: "center",
//     flex: 1,

//     // flex: 1,
//     // fontWeight: "700",
//     // fontFamily: 'Roboto-bold',
//   },
//   tableRow: {
//     flexDirection: "row",
//     // justifyContent: "space-between",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     marginHorizontal: 10,
//   },
//   cellText: {
//     fontSize: 13,
//     flex: 1,
//     fontWeight: "bold",
//     color: "#00050e",
//     //for responsive
//     // flexWrap: "wrap",
//     alignSelf: "center",
//   },

//   quantity: {
//     // marginLeft: 50,
//   },
//   // ===================
//   actionButton: {
//     padding: 5,
//     borderRadius: 5,
//     display: "flex",
//     justifyContent: "center",
//     flexDirection: "row",
//   },
//   actionText: {
//     color: "white", // Button text color
//     fontWeight: "bold",
//   },
//   // ==============
//   headerTextForname: {
//     alignSelf: "center",
//     fontSize: 17,
//     color: "#00050e",
//     width: "50%",
//     // fontWeight: "bold",
//     // backgroundColor:"red"
//   },
//   cellTextForName: {
//     alignSelf: "center",
//     width: "56%",
//     fontSize: 13,
//     fontWeight: "bold",
//     color: "#00050e",

//     // backgroundColor:"red"
//   },
//   //=======table end ===========

//   // button design for order details
//   btngrp: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     marginTop: 20,
//     paddingHorizontal: 10,
//     gap: 5,
//   },
//   loadingContainer: {
//     alignSelf: "center",
//     flex: 1,
//     // justifyContent:"center",
//     // alignItems:"center"
//   },
//   lottiContainer: {
//     height: 50,
//     width: 50,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInformation: {
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 3,
  },
  userText1: {
    fontSize: 16,
    color: "black",
    // marginTop:10,
  },
  userText2: {
    fontSize: 16,
    color: "#168aad",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  dataContainer: {
    // marginTop: 20,
  },

  button: {
    width: "50%",
    backgroundColor: "#3498db",
    padding: 10,
  },
  button2: {
    width: "50%",
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
    color: "black",
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,

    color: blackColor,
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
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#0b090a",
    padding: 7,
    minWidth: 40,
    // borderBottomWidth:1,
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
    // marginVertical: 10,
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
    color: "#0b090a",
  },
  iconx: {
    marginRight: 10,
  },
  // =============== table =========//
  tableHeader: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "lightgray",

    // backgroundColor: "#184e77",
    // backgroundColor: "#f2f2f2",
    // Header background color
    //  paddingHorizontal:5
    // flex:1,
  },
  headerText: {
    fontSize: 17,
    color: "black",
    flex: 1,
    textAlign: "center",
    // fontWeight: "700",
    // fontFamily: 'Roboto-bold',
  },
  tableRow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginHorizontal: 10,
  },
  cellText: {
    fontSize: 13,
    flex: 1,
    fontWeight: "bold",
    color: "#00050e",
    textAlign: "center",
    alignSelf: "center",
  },

  quantity: {
    // marginLeft: 25,
  },
  // ===================
  actionButton: {
    // backgroundColor: "#dee2e6",
    // Button background color
    padding: 5,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    // Button text color
  },
  //==========================
  headerTextForname: {
    alignSelf: "center",
    fontSize: 17,
    color: "#00050e",
    width: "50%",

    // fontWeight: "bold",
    // backgroundColor:"red"
  },
  cellTextForName: {
    alignSelf: "center",
    width: "50%",
    fontSize: 13,
    fontWeight: "bold",
    color: "#00050e",
  },

  //=======table end ===========
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
