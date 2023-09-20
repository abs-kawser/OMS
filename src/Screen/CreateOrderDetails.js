import React, { useState, useMemo } from "react";
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
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const CreateOrderDetails = () => {
  const [showProductData, setShowProductData] = useState(false);
  const [showOrderData, setShowOrderData] = useState(false);

  const [checkedProducts, setCheckedProducts] = useState([]);
  const [quantity, setQuantity] = useState();

  // Sample array of products and orders
  const data = [
    {
      id: 1,
      type: "product",
      name: "Product 1",
      price: "100",
      value: 1,
    },
    {
      id: 2,
      type: "product",
      name: "Product 2",
      price: "200",
      value: 2,
    },
    {
      id: 3,
      type: "product",
      name: "Product 3",
      price: "300",
      value: 3,
    },

    {
      id: 1,
      type: "order",
      orderNumber: "Order 1",
      date: "2023-09-13",
    },
    {
      id: 2,
      type: "order",
      orderNumber: "Order 2",
      date: "2023-09-14",
    },
  ];

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



  // Function to increment quantity
  const incrementQuantity = (index) => {
    const updatedProductData = [...filteredProductData];
    const product = updatedProductData[index];
    product.value = (product.value || 0) + 1;
    setQuantity(product.value);
    // Update the product data with the new value
    filteredProductData(updatedProductData);
  };


  // Function to decrement quantity
  const decrementQuantity = (index) => {
    const updatedProductData = [...filteredProductData];
    const product = updatedProductData[index];
    if (product.value > 0) {
      product.value = product.value - 1;
      setQuantity(product.value);
      // Update the product data with the new value
      filteredProductData(updatedProductData);
    }
  };





  
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

  //use memo
  const filteredProductData = useMemo(() => {
    return data.filter((item) => item.type === "product");
  }, [data]);

  const filteredOrderData = useMemo(() => {
    return data.filter((item) => item.type === "order");
  }, [data]);

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
          <View style={styles.dataContainer} key={data.id}>
            {filteredProductData.map((product, index) => (
              <View style={styles.row}>
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{product.name}name</Text>
                  <Text style={styles.price}>{product.price}price </Text>
                </View>

                <View style={styles.quantityContainer}>
                  <View style={styles.containerx}>
                    <Text style={styles.label}>Quantity:</Text>
                    <View style={styles.inputContainer}>
                      <TouchableOpacity
                        onPress={() => decrementQuantity(index)}
                      >
                        <Text style={styles.button}>-</Text>
                      </TouchableOpacity>

                      {/* old code  */}
          <TextInput
            style={styles.input}
            value={product.value ? product.value.toString() : ""}
            onChangeText={(text) => {
              const value = parseInt(text, 10);
              if (!isNaN(value)) {
                product.value = value;
                setQuantity(value);
                // Update the product data with the new value
                filteredProductData(updatedProductData);
              }
            }}
            keyboardType="numeric"
            // style={styles.input}
            // value={quantity ? quantity.toString() : ""}
            // onChangeText={(text) => {
            //   const value = parseInt(text, 10);
            //   if (!isNaN(value)) {
            //     setQuantity(value);
            //   }
            // }}
            // keyboardType="numeric"
          />

                      <TouchableOpacity
                        onPress={() => incrementQuantity(index)}
                      >
                        <Text style={styles.button}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* <Text style={styles.underline}>{product.quantity}10</Text> */}
                </View>

                <View style={styles.checkboxContainer}>
                  <Checkbox.Android
                    status={
                      checkedProducts.includes(product.name)
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => toggleProductCheckbox(product.name)}
                    color="blue"
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {showOrderData && (
          <View style={styles.dataContainer}>
            {filteredOrderData.map((order, index) => (
              <View key={index} style={styles.row}>
                <Text>Order Number: {order.orderNumber}</Text>
                <Text>Date: {order.date}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CreateOrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // Center the buttons vertically
    gap: 5,
    top: 15,
    padding: 20,
  },
  dataContainer: {
    marginTop: 20,
  },

  //

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  infoContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  price: {
    fontSize: 16,
    color: "green",
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

  // ===================//
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
