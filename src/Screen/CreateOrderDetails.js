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
} from "react-native";
import { fetchProductData } from "../Api/ProductListApi";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useLogin } from "../Context/LoginProvider";
import { Button } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import base64 from "base-64";

import LottieView from "lottie-react-native"; // Import LottieView
import { useCustomerInfo } from "../Context/CustomerProvider";

const CreateOrderDetails = ({ route }) => {
  const data = route.params?.data;

  console.log("create order page data", data?.DeliveryDate);

  const { customerInformation, setCustomerInformation } = useCustomerInfo();
  console.log(customerInformation, "customerInformation");

  const navigation = useNavigation();

  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;

  const [showProductData, setShowProductData] = useState(true);
  const [showOrderData, setShowOrderData] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);

  const [productQuantities, setProductQuantities] = useState([]);
  console.log("product quantities", productQuantities);

  const [selectedProductIds, setSelectedProductIds] = useState([]);
  // console.log("selected  ProductIds:", selectedProductIds);

  const [searchTerm, setSearchTerm] = useState("");
  const [orderQuantities, setOrderQuantities] = useState(null);
  console.log(`Quantities`, orderQuantities);

  const [quantity, setQuantity] = useState([]); // Initialize with an empty string
  console.log("this is quantity value ", quantity);

  const [isLoadingProductData, setIsLoadingProductData] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const [totalAmount, setTotalAmount] = useState([]);

  // console.log("total ammount",totalAmount);

  console.log(
    "selected Products item :",
    JSON.stringify(selectedProduct, null, 2)
  );

  // product api calling
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

  // find quantity value

  // const logQuantityValues = () => {
  //   const quantityValues = selectedProduct.map(
  //     (product) => productQuantities[product.ProductId] || 0
  //   );

  //   const ammount = selectedProduct.map((item)=>setTotalAmount(item.MRP))

  //   setTotalAmount(ammount)

  //   setQuantity(quantityValues);
  // };

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
    console.log("Quantity:", quantityValues);
    console.log("Total Amount:", totalAmountValues);
  };

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

  // Filter products based on the search term
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // ================================== main api calling ========================================================
  const transformedOrderDetails = selectedProduct.map((product, index) => {
    return {
      ProductId: product.ProductId,
      Quantity: quantity[index], // You can set the desired quantity here
      UnitPrice: product.MRP, // Use the trade price or any other desired price
      Status: 0, // Set the desired status
    };
  });

  const fetchCreatenewOrderData = async () => {
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
    } catch (error) {
      // Handle network errors here if needed
      console.error("Network error:", error);
      ToastAndroid.show("Network error", ToastAndroid.LONG);
    }
  };

  // ============== draft save =================

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
    try {
      // Retrieve the existing data from AsyncStorage
      const existingData = await AsyncStorage.getItem("customerInformation");

      console.log("existing data in async storage", existingData);

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

  // ==================================

  useEffect(() => {
    // Inside this effect, filter and set the selected products based on product IDs
    const selectedProducts = selectedProductIds.map((productId) => {
      return products.find((product) => product.ProductId === productId);
    });

    setSelectedProduct(
      selectedProducts.filter((product) => product !== undefined)
    );
  }, [selectedProductIds, products]);

  return (
    <View style={styles.container}>
      <View style={styles.userInformation}>
        {/* Import contex for show name dynamicly*/}
        <Text style={styles.userText1}>{customerInformation?.Name}</Text>
        <Text style={{ color: "black" }}>
          ({customerInformation?.CustomerId})
        </Text>
        {/* <Text style={styles.userText2}> UserID :{userDetails.EmpId}</Text> */}
      </View>

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

            <View>
              {showOrderData && (
                <View style={styles.dataContainer}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Name</Text>
                    <Text style={styles.headerText}>Quantity</Text>
                    <Text style={styles.headerText}>Amount</Text>
                    <Text style={styles.headerText}>Action</Text>
                  </View>

                  <>
                    {selectedProduct.map((specificProduct) => {
                      // Check if the product has a quantity value
                      const quantity =
                        productQuantities[specificProduct.ProductId] || 0;

                      if (quantity > 0) {
                        return (
                          <View
                            style={styles.tableRow}
                            key={specificProduct.ProductId}
                          >
                            <Text style={styles.cellText} numberOfLines={2}>
                              {specificProduct.Name}
                            </Text>
                            <Text style={styles.cellText}>{quantity}</Text>
                            <Text style={styles.cellText}>
                              {specificProduct.MRP * quantity}
                            </Text>

                            <TouchableOpacity
                              style={styles.actionButton}
                              onPress={() =>
                                console.log("Delete button pressed")
                              }
                            >
                              <Icon name="trash" size={25} color="tomato" />
                            </TouchableOpacity>
                          </View>
                        );
                      }

                      return null;
                    })}
                  </>

                  <View style={styles.btngrp}>
                    <Button onPress={handleDraftSave}>Save</Button>
                    <Button onPress={fetchCreatenewOrderData}>Submit</Button>
                  </View>
                </View>
              )}
            </View>
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
    // fontWeight: "bold",
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
