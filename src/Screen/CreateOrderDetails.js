import React, { useState, useMemo, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Checkbox } from "react-native-paper";
import Header from "../../components/Header";
import { fetchProductData } from "../Api/ProductListApi";

const CreateOrderDetails = () => {
  const [showProductData, setShowProductData] = useState(false);
  const [showOrderData, setShowOrderData] = useState(false);

  const [productQuantities, setProductQuantities] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Api related work
  useEffect(() => {
    const getProductList = async () => {
      try {
        const productList = await fetchProductData(setIsLoading);
        // setProducts(productList);

        //setFilteredData(productList);
        setProducts(productList);
        setIsLoading(false);
      } catch (error) {
        // Handle the error gracefully
        console.error("Error fetching product list:", error);
      }
    };

    getProductList();
  }, []);

  // Sample array of products and orders
  // const data = [
  //   {
  //     id: 1,
  //     type: "product",
  //     name: "Product 1",
  //     price: "100",
  //   },
  //   {
  //     id: 2,
  //     type: "product",
  //     name: "Product 2",
  //     price: "200",
  //   },
  //   {
  //     id: 3,
  //     type: "product",
  //     name: "Product 3",
  //     price: "300",
  //   },

  //   {
  //     id: 1,
  //     type: "order",
  //     orderNumber: "Order 1",
  //     date: "2023-09-13",
  //   },
  //   {
  //     id: 2,
  //     type: "order",
  //     orderNumber: "Order 2",
  //     date: "2023-09-14",
  //   },
  // ];

  const handleProductButtonPress = () => {
    setShowProductData(true);
    setShowOrderData(false);
    // You can perform additional actions related to showing product data here.
  };

  const handleOrderButtonPress = () => {
    setShowProductData(false);
    setShowOrderData(true);
    // You can perform additional actions related to showing order data here.
  };

  // // Function to increment quantity for a specific product
  // const incrementQuantity = (productId) => {
  //   const updatedQuantities = { ...productQuantities };
  //   updatedQuantities[productId] = (updatedQuantities[productId] || 0) + 1;
  //   setProductQuantities(updatedQuantities);
  // };

  // // Function to decrement quantity for a specific product
  // const decrementQuantity = (productId) => {
  //   const updatedQuantities = { ...productQuantities };
  //   if (updatedQuantities[productId] > 0) {
  //     updatedQuantities[productId] -= 1;
  //     setProductQuantities(updatedQuantities);
  //   }
  // };

  //togglecheck product
  const toggleProductCheckbox = (name) => {
    //old code
    const updatedCheckedProducts = [...checkedProducts];
    if (updatedCheckedProducts.includes(name)) {
      // Product is already checked, uncheck it
      updatedCheckedProducts.splice(updatedCheckedProducts.indexOf(name), 1);
    } else {
      // Product is not checked, check it
      updatedCheckedProducts.push(name);
    }
    setCheckedProducts(updatedCheckedProducts);
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
      }
    }
  };


  const incrementQuantity = (productId) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };
  
  const decrementQuantity = (productId) => {
    setProductQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      if (updatedQuantities[productId] > 0) {
        updatedQuantities[productId] -= 1;
      }
      return updatedQuantities;
    });
  };



  // //use memo
  // const filteredProductData = useMemo(() => {
  //   return data.filter((item) => item.type === "product");
  // }, [data]);

  // const filteredOrderData = useMemo(() => {
  //   return data.filter((item) => item.type === "order");
  // }, [data]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.buttonContainer}>
        <Button
          title="Product List"
          color="#3498db"
          onPress={handleProductButtonPress}
        />
        <Button
          title="Order Details"
          color="#e74c3c"
          onPress={handleOrderButtonPress}
        />
      </View>

      <ScrollView>
        {showProductData && (
          //key id
          <View style={styles.dataContainer}>
            {products.map((product, index) => (
              <View style={styles.row} key={product.ProductId}>
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{product.Name} </Text>

                 <View style={{flexDirection: "row", gap:10 ,}}> 
                 <Text style={styles.price}>price :{product.MRP}</Text>
                  <Text style={styles.price}>PackSize :{product.PackSize}</Text>
                 </View>
                  

                </View>

                {/* quantity   part  start  */}
                <View style={styles.quantityContainer}>

                  <View style={styles.containerx}>
                    {/* <Text style={styles.label}>QTY:</Text> */}
                    <View style={styles.inputContainer}>
                      <TouchableOpacity
                        onPress={() => decrementQuantity(product.ProductId)}
                      >
                        <Text style={styles.button}>-</Text>
                      </TouchableOpacity>
                      <TextInput

                        style={styles.input}
                        value={
                          productQuantities[product.ProductId]
                            ? productQuantities[product.ProductId].toString()
                            : ""
                        }
                        onChangeText={(text) =>
                          handleQuantityChange(product.ProductId, text)
                        }
                        keyboardType="numeric"

                        //=============================semi working code just first value not delete  //
                        // style={styles.input}
                        // value={
                        //   productQuantities[product.ProductId]
                        //     ? productQuantities[product.ProductId].toString()
                        //     : ""
                        // }
                        // onChangeText={(text) => {
                        //   const value = parseInt(text, 10);
                        //   const updatedQuantities = { ...productQuantities };
                        //   if (!isNaN(value)) {
                        //     updatedQuantities[product.id] = value;
                        //     setProductQuantities(updatedQuantities);
                        //   }
                        // }}
                        // keyboardType="numeric"
                      />
                      <TouchableOpacity
                        onPress={() => incrementQuantity(product.ProductId)}
                      >
                        <Text style={styles.button}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.checkboxContainer}>
                  <Checkbox.Android
                    status={
                      checkedProducts.includes(product.Name)
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => toggleProductCheckbox(product.Name)}
                    color="blue"
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {/* {showOrderData && (
          <View style={styles.dataContainer}>
            {filteredOrderData.map((order, index) => (
              <View key={index} style={styles.row}>
                <Text>Order Number: {order.orderNumber}</Text>
                <Text>Date: {order.date}</Text>
              </View>
            ))}
          </View>
        )} */}
      </ScrollView>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    padding: 20,
  },
  dataContainer: {
    marginTop: 20,
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
    color:"gray",
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
  
    color: "#403d39",
  },
  quantityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  underline: {
    textDecorationLine: "underline",
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
  button: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    minWidth: 40,
  },
});
