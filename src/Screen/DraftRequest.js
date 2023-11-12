import React, { useState, useMemo, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  FlatList,
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
import { useDraft } from "../Context/DraftProvider";

const DraftRequest = ({ route }) => {
  const navigation = useNavigation();

  const { draftData, setDraftData } = useDraft();
  //const { selectedItem, onDeleteItem } = route.params;
  const [selectedItem, setSelectedItem] = useState(route.params.selectedItem);

  console.log("draft page data", JSON.stringify(selectedItem, null, 2));

  const data = route.params?.data;

  const { customerInformation, setCustomerInformation } = useCustomerInfo();

  console.log(customerInformation, "customerInformation");

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

  const [orderItems, setOrderItems] = useState([]);
  //const [orderItems, setOrderItems] = useState(selectedItem.OrderDetails);
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

  const draftOrderDetails = selectedItem.OrderDetails.map((product) => {
    return {
      ProductId: product.ProductId,
      Quantity: product.Quantity,
      UnitPrice: product.UnitPrice,
      Status: 0,
    };
  });

  const transformedOrderDetails = selectedProduct.map((product, index) => {
    return {
      ProductId: product.ProductId,
      Quantity: quantity[index],
      UnitPrice: product.MRP,
      Status: 0,
    };
  });

  const initialMergedOrderDetails = [
    ...draftOrderDetails,
    ...transformedOrderDetails,
  ];
  console.log("merge data", JSON.stringify(initialMergedOrderDetails, null, 2));

  const fetchCreatenewOrderData = async () => {
    const requestData = {
      OrderDetails: initialMergedOrderDetails,
      CustomerId: selectedItem?.CustomerId,
      OrderDate: selectedItem?.OrderDate,
      DeliveryDate: selectedItem?.DeliveryDate,
      EntryBy: selectedItem?.EntryBy,
      Note: selectedItem?.Note,
      TerritoryId: selectedItem?.TerritoryId,
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

        console.log(
          "this is result from draft",
          JSON.stringify(result, null, 2)
        );

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

  // ============================
  const handleDeleteProduct = (productId) => {
    setSelectedProductIds((prevIds) =>
      prevIds.filter((id) => id !== productId)
    );
  };

  // const handleDeleteProduct = (productId) => {
  //   console.log("Deleting product with ID:", productId);

  //   setSelectedProductIds((prevIds) => {
  //     const newIds = prevIds.filter((id) => id !== productId);
  //     console.log("New selectedProductIds:", newIds);
  //     return newIds;
  //   });
  // };

  // =========================================================

  // const handleDeleteOrderItem = (productId) => {
  //   setOrderItems((prevItems) => prevItems.filter((item) => item.ProductId !== productId));
  //   console.log("Deleting product with ID:", productId);
  // };

  //this code is for draft save product delete  semi working ocde

  // const handleDeleteOrderItem = async (productId) => {
  //   const updatedOrderDetails = selectedItem.OrderDetails.filter(
  //     (orderItem) => orderItem.ProductId !== productId
  //   );
  //   setSelectedItem((prevSelectedItem) => ({
  //     ...prevSelectedItem,
  //     OrderDetails: updatedOrderDetails,
  //   }));

  //   // Update the AsyncStorage data
  //   // await AsyncStorage.setItem("customerInformation", JSON.stringify(updatedOrderDetails));

  //     // Update the state with the modified data
  //     // setDraftData(updatedOrderDetails);

  // };

  // ============== amar kaj kora ============

  // const handleDeleteOrderItem = async (productId) => {
  //   try {
  //     // Create a copy of the selected item and its OrderDetails
  //     const updatedOrderDetails = [...selectedItem.OrderDetails];

  //     // Filter out the item with the specified productId
  //     const updatedOrderDetailsFiltered = updatedOrderDetails.filter(
  //       (orderItem) => orderItem.ProductId !== productId
  //     );

  //     // Update the selected item's OrderDetails with the filtered data
  //     setSelectedItem((prevSelectedItem) => ({
  //       ...prevSelectedItem,
  //       OrderDetails: updatedOrderDetailsFiltered,
  //     }));

  //     // Update the AsyncStorage data with the modified OrderDetails
  //     const updatedData = { ...draftData, OrderDetails: updatedOrderDetailsFiltered };
  //     await AsyncStorage.setItem("customerInformation", JSON.stringify(updatedData));

  //     setDraftData(updatedData);

  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   }
  // };

  // const handleDeleteOrderItem = async (productId) => {
  //   try {
  //     // Create a copy of the selected item
  //     const updatedSelectedItem = { ...selectedItem };

  //     // Filter out the item with the specified productId from OrderDetails
  //     const updatedOrderDetailsFiltered = updatedSelectedItem.OrderDetails.filter(
  //       (orderItem) => orderItem.ProductId !== productId
  //     );

  //     // Update the selected item's OrderDetails with the filtered data
  //     updatedSelectedItem.OrderDetails = updatedOrderDetailsFiltered;

  //     setSelectedItem(updatedSelectedItem)

  //     // Update the AsyncStorage data with the modified selected item
  //     await AsyncStorage.setItem("customerInformation", JSON.stringify(updatedSelectedItem));

  //     // Update the state with the modified data
  //     setDraftData(updatedSelectedItem);
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   }
  // };

  const handleDeleteOrderItem = async (productId) => {
    try {
      // Create a copy of the draftData array
      const updatedDraftData = [...draftData];

      // Find the specific item within the cloned array
      const itemIndex = updatedDraftData.findIndex(
        (item) => item.CustomerId === selectedItem.CustomerId
      );

      if (itemIndex !== -1) {
        // Clone the selected item within the array
        const updatedSelectedItem = { ...updatedDraftData[itemIndex] };

        // Filter out the item with the specified productId from OrderDetails
        const updatedOrderDetailsFiltered =
          updatedSelectedItem.OrderDetails.filter(
            (orderItem) => orderItem.ProductId !== productId
          );

        // Update the selected item's OrderDetails with the filtered data
        updatedSelectedItem.OrderDetails = updatedOrderDetailsFiltered;

        setSelectedItem(updatedSelectedItem);

        // Update the draftData array with the modified item
        updatedDraftData[itemIndex] = updatedSelectedItem;

        // Update the AsyncStorage data with the modified draftData
        await AsyncStorage.setItem(
          "customerInformation",
          JSON.stringify(updatedDraftData)
        );

        // Update the state with the modified data
        setDraftData(updatedDraftData);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  //css issue
  const isSelectedProduct = (productId) => {
    return selectedProductIds.includes(productId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInformation}>
        <Text style={styles.userText1}>{selectedItem?.CustomerName}</Text>
        <Text style={{ color: "black" }}>({selectedItem?.CustomerId})</Text>
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
          <Button color="#FF5733" onPress={handleOrderButtonPress}>
            Order Details
          </Button>
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
          <View>
            <>
              {showProductData && (
                //key id
                <View style={styles.dataContainer}>
                  <FlatList
                    data={filteredProducts}
                    keyExtractor={(product) => product.ProductId.toString()}
                    renderItem={({ item: product }) => (
                      <View style={styles.row}>
                        <View style={styles.infoContainer}>
                          <Text style={styles.name}>{product.Name}</Text>

                          <View style={{ flexDirection: "row", gap: 10 }}>
                            <Text style={styles.price}>
                              price: {product.MRP}
                            </Text>
                            <Text style={styles.price}>
                              PackSize: {product.PackSize}
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

            <>
              <View>
                {showOrderData && (
                  <View style={styles.dataContainer}>
                    <View style={styles.tableHeader}>
                      <Text style={styles.headerText}>Name</Text>

                      {/* <Text style={styles.headerText}>Quantity</Text> */}
                      <Text style={[styles.headerText, styles.quantity]}>
                        Quantity
                      </Text>

                      {/* <Text 
                style={[styles.cellText, isSelectedProduct(specificProduct.ProductId) && styles.quantityWithMargin]}>
                    {quantity}
                    </Text> */}

                      <Text style={styles.headerText}>Amount</Text>
                      <Text style={styles.headerText}>Action</Text>
                    </View>

                    {/* Render selectedProduct */}
                    {selectedProduct.map((specificProduct) => {
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

                            {/* <Text style={styles.cellText}>{quantity}</Text> */}
                            <Text style={[styles.cellText, styles.quantity]}>
                              {quantity}
                            </Text>

                            <Text style={styles.cellText}>
                              {specificProduct.MRP * quantity}
                            </Text>

                            <View style={{ flex: 1, alignSelf: "center" }}>
                               <TouchableOpacity
                              style={styles.actionButton}
                              onPress={() =>
                                handleDeleteProduct(specificProduct.ProductId)
                              }

                              //onPress={() => console.log("Delete button pressed")}
                            >
                              <Icon name="trash" size={20} color="#212529" />
                            </TouchableOpacity>
                            </View>
                           
                          </View>
                        );
                      }

                      return null;
                    })}

                    {/* Render OrderDetails */}
                    {selectedItem.OrderDetails.map((orderItem) => (
                      <View style={styles.tableRow} key={orderItem.ProductId}>
                        <Text style={styles.cellText} numberOfLines={2}>
                          {orderItem.ProductName}
                        </Text>

                        <Text style={styles.cellText}>
                          {orderItem.Quantity}
                        </Text>

                        <Text style={styles.cellText}>
                          {orderItem.TotalAmount}
                        </Text>

                        <View style={{ flex: 1, alignSelf: "center" }}>
                          <TouchableOpacity
                            style={[styles.actionButton]}
                            //onPress={() => handleDeleteOrderItem(orderItem.ProductId)}
                            onPress={() =>
                              handleDeleteOrderItem(orderItem.ProductId)
                            }
                          >
                            <Icon name="trash" size={20} color="#212529" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}

                    <View style={styles.btngrp}>
                      <Button onPress={fetchCreatenewOrderData}>Submit</Button>
                    </View>
                  </View>
                )}
              </View>
            </>
          </View>
        )}
      </>

      {/* <Text style={styles.totalPriceText}>
        Total Price: {calculateTotalPrice()}
      </Text> */}
    </View>
  );
};

export default DraftRequest;

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
    marginTop: 20,
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
  // ===============
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
   backgroundColor:"gray",
   marginHorizontal:10


     // backgroundColor: "#f2f2f2", // Header background color
    //  paddingHorizontal:5
    // flex:1,
  },
  headerText: {
    // fontWeight: "bold",
    fontSize: 17,
    color: "white",

    // borderWidth:1,

    flex: 1,
    textAlign: "center",
   
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Border color
    marginHorizontal:10,
  },
  cellText: {
    fontSize: 13,
    flex: 1,
    fontWeight: "bold",
    color: "#00050e",

    // borderWidth:1,
    // color: "#1985a1",
    textAlign: "center",
    
  },

  quantity: {
    // marginLeft: 25,
  },
  // ===================
  actionButton: {
    // backgroundColor: "#dee2e6", // Button background color
    padding: 5,
    borderRadius: 5,

    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
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
