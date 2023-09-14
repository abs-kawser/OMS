import React, { useState, useMemo } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import Header from "../components/Header";

const CreateOrderDetails = () => {
  const [showProductData, setShowProductData] = useState(false);
  const [showOrderData, setShowOrderData] = useState(false);

  // Sample array of products and orders
  const data = [
    {
      type: "product",
      name: "Product 1",
      price: "100",
    },
    {
      type: "product",
      name: "Product 2",
      price: "200",
    },
    {
      type: "product",
      name: "Product 3",
      price: "300",
    },

    {
      type: "order",
      orderNumber: "Order 1",
      date: "2023-09-13",
    },
    {
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


  const [checkedProductIndex, setCheckedProductIndex] = useState();

  // const handleCheckBoxToggle = (index) => {
  //   if (index === checkedProductIndex) {
  //     // Clicked on the already checked product, uncheck it
  //     setCheckedProductIndex(null);
  //   } else {
  //     // Clicked on a different product, check it
  //     setCheckedProductIndex(index);
  //   }
  // };


  const handleCheckBoxToggle = (index) => {
    // Create a copy of the checkedProducts array
    const updatedCheckedProducts = [...checkedProducts];

    // Toggle the checked state for the clicked checkbox
    if (updatedCheckedProducts.includes(index)) {
      // If it's already checked, uncheck it
      updatedCheckedProducts.splice(updatedCheckedProducts.indexOf(index), 1);
    } else {
      // If it's not checked, check it
      updatedCheckedProducts.push(index);
    }

    // Update the state with the new checkedProducts array
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
      <Header/>
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
            {filteredProductData.map((product,index) => (
              <View style={styles.row}>
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{product.name}name</Text>
                  <Text style={styles.price}>{product.price}price </Text>
                </View>
                <View style={styles.quantityContainer}>
                  <Text style={styles.underline}>{product.quantity}10</Text>
                </View>

                <View style={styles.checkboxContainer}>
                  <Checkbox.Android
                    status={
                      index === checkedProductIndex ? "checked" : "unchecked"
                    }
                    onPress={() => handleCheckBoxToggle(index)}
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
    padding:20
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
});
