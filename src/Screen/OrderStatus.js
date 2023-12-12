import React, { useState, useEffect } from "react";
import {
  View,
  // Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ToastAndroid,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import base64 from "base-64";

//import { Button } from "react-native-elements";

import { TextInput as PaperTextInput, Button } from "react-native-paper";
import { Text } from "react-native-paper";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import { useLogin } from "../Context/LoginProvider";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCustomerInfo } from "../Context/CustomerProvider";

const OrderStatus = () => {
  const navigation = useNavigation();

  const [showOrderDatePicker, setShowOrderDatePicker] = useState(false);
  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);

  //validation state
  const [error, setError] = useState("");
  const [customerError, setCustomerError] = useState("");

  const [orderDate, setOrderDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [customerId, setCustomerId] = useState("");

  console.log("orderDate", orderDate);
  console.log("deliveryDate", deliveryDate);
  console.log("customerID", customerId);

  // context

  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;

  //const [orderDate, setOrderDate] = useState(new Date());
  //const [deliveryDate, setDeliveryDate] = useState(new Date());

  const showDatepicker = (type) => {
    if (type === "order") {
      setShowOrderDatePicker(true);
    } else if (type === "delivery") {
      setShowDeliveryDatePicker(true);
    }
  };

  // ================================================
  const handleOrderDate = (event, selectedDate) => {
    setShowOrderDatePicker(false);
    if (selectedDate !== undefined) {
      setOrderDate(selectedDate);
      // Attempt to set the delivery date
      if (selectedDate > deliveryDate) {
        setError("Delivery date cannot be earlier than order date");
      } else {
        setError("");
      }
    }
  };

  const handleDateDelivery = (event, selectedDate) => {
    setShowDeliveryDatePicker(false);
    if (selectedDate) {
      setDeliveryDate(selectedDate);
      // Attempt to set the delivery date
      if (selectedDate < orderDate) {
        setError("Delivery date cannot be earlier than order date");
      } else {
        // Throw an error if the delivery date is earlier than the order date
        setError("");
      }
    }
  };

  const handleCustomerIdChange = (number) => {
    setCustomerId(number);
    setCustomerError("");
  };

  const fetchOrderStatus = async () => {
    try {
      if (!customerId) {
        setCustomerError("Please fill up the customer ID");
        return; // Exit the function if customer ID is not provided
      }

      // Reset customerError if user provides the customer ID
      setCustomerError("");
      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);

      const url = `${BASE_URL}/api/OrdersStatusCheckingAPI/GetOrdersStatus?EmpId=${
        userDetails?.EmpCode
      }&OrderDate=${moment(orderDate).format(
        "YYYY-MM-DD"
      )}&DeliveryDate=${moment(deliveryDate).format(
        "YYYY-MM-DD"
      )}&CustomerId=${customerId}`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      const Result = await response.json();

      if (Result && Result.length > 0) {
        navigation.navigate("Order Status Info", { OrderStatus: Result });
      } else {
        ToastAndroid.show(Result.status, ToastAndroid.SHORT);
      }
    } catch (error) {
      // setError("Please fill up all fields");
      console.error("Error fetching data:", error);
      // throw error;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setOrderDate(new Date());
      setDeliveryDate(new Date());
      setCustomerId("");
      setError("");
      setCustomerError("");
    }, [])
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Order Date</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showDatepicker("order")}
        >
          {showOrderDatePicker && (
            <DateTimePicker
              value={orderDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) =>
                handleOrderDate(event, selectedDate)
              }
            />
          )}
          <Text style={{ color: "black" }}>
            {moment(orderDate).format("DD-MM-YYYY")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* delivery date */}
      <View style={{ marginTop: 15 }}>
        <Text style={styles.label}> Delivery Date</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showDatepicker("delivery")}

          // Disable if client name is not valid
          // disabled={!isClientNameValid}
        >
          {showDeliveryDatePicker && (
            <DateTimePicker
              value={deliveryDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) =>
                handleDateDelivery(event, selectedDate)
              }
            />
          )}

          <Text style={{ color: "black" }}>
            {moment(deliveryDate).format("DD-MM-YYYY")}
          </Text>
        </TouchableOpacity>

        {error ? (
          <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
        ) : null}
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Customer ID</Text>
        <TextInput
          style={[styles.input, { height: 50, marginTop: 10 }]}
          mode="outlined"
          label="Customer ID"
          placeholder="Enter customer ID"
          placeholderTextColor="black"
          onChangeText={handleCustomerIdChange}
          value={customerId}
          keyboardType="numeric"
          // onChangeText={(text) => setCustomerId(text)}
        />

        {customerError ? (
          <Text style={{ color: "red", marginTop: 5 }}>{customerError}</Text>
        ) : null}

        <Button
          mode="contained"
          style={styles.searchButton}
          onPress={() => fetchOrderStatus()}
        >
          Search
        </Button>
      </View>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    //alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    // borderColor: "#9667e0",
    borderColor: "#0096c7",
    borderRadius: 5,
    height: 0,
    justifyContent: "center",
    marginBottom: 16,
  },

  button: {
    borderWidth: 1,
    // borderColor: "#7209b7",
    borderColor: "#0096c7",
    borderRadius: 5,
    padding: 10,
    height: 50,
    marginTop: 10,
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
    fontSize: 18,
    marginTop: 5,
  },

  searchButton: {
    width: "50%",
    marginTop: 30,
    backgroundColor: "#2E97A7",
    alignSelf: "flex-end",
  },
});

// Api caaling
// const fetchOrderStatus = async () => {
//   try {
//     const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
//     const response = await fetch(
//       `${BASE_URL}/api/OrdersStatusCheckingAPI/GetOrdersStatus?EmpId=${userDetails.EmpCode}&OrderDate=${orderDate}&DeliveryDate=${deliveryDate}&CustomerId=${customerId}`,
//       {
//         headers: {
//           Authorization: authHeader,
//         },
//       }
//     );

//     if (!response.ok) {
//       setError("An error occurred while fetching data.");
//       console.log(response.statusText);
//     } else {
//       setError(""); // Clear the error state
//       const jsonData = await response.json();

//       if (jsonData.status === "No Data Found !") {
//         // setError(jsonData.status);
//         ToastAndroid.show(jsonData.status, ToastAndroid.SHORT);
//       } else {
//         navigation.navigate("Order Status Info", { OrderStatus: jsonData });
//       }
//     }
//   } catch (error) {
//     setError("Please fill up all fields");
//     console.error("Error fetching data:", error);

//     throw error;
//   }
// };

// /api/OrdersStatusCheckingAPI/GetOrdersStatus?EmpId=${userDetails?.EmpCode}&OrderDate=${orderDate}&DeliveryDate=${deliveryDate}&CustomerId=${customerId}

//  /api/OrdersStatusCheckingAPI/GetOrdersStatus?EmpId=U21080273&        OrderDate=2023-12-11&DeliveryDate=2023-12-11&CustomerId=318233

// if (!response.ok) {
//   setError("An error occurred while fetching data.");
//   console.log(response.statusText);
// } else {
//   setError(""); // Clear the error state
//   const jsonData = await response.json();

//   if (jsonData.status === "No Data Found !") {
//     ToastAndroid.show(jsonData.status, ToastAndroid.SHORT);
//   } else {
//     navigation.navigate("Order Status Info", { OrderStatus: jsonData });
//   }
// }

// const url = `${BASE_URL}/api/OrdersStatusCheckingAPI/GetOrdersStatus?EmpId=${userDetails?.EmpCode}&OrderDate=${orderDate}&DeliveryDate=${deliveryDate}&CustomerId=${customerId}`;

// const emp = "U21080273";
// const customer = "300255";
// console.log({
//   orderDate,
//   deliveryDate,
//   baseUrl: `${BASE_URL}/api/OrdersStatusCheckingAPI/GetOrdersStatus?EmpId=${
//     userDetails.EmpCode
//   }&OrderDate=${orderDate
//     .toISOString()
//     .substring(0, 10)}&DeliveryDate=${deliveryDate
//     .toISOString()
//     .substring(0, 10)}&CustomerId=${customerId}`,
//   PASSWORD,
//   USERNAME,
// });

// useEffect(() => {
//   // declare the data fetching function
//   const fetchData = async () => {
//     const data = await fetchOrderStatus();
//   }

//   // call the function
//   fetchData()
//     // make sure to catch any error
//     // .catch(console.error);
// }, [])

{
  /* <Text style={styles.label}>Order Date</Text>
      <TouchableOpacity
      style={styles.button}
      onPress={() => showOrderDatepicker()}
    >
      {showOrderDatePicker ? (
        <DateTimePicker
          value={orderDate || new Date()} // Use a default date if orderDate is null
          mode="date"
          display="default"
          onChange={(event, selectedDate) =>
            handleOrderDate(event, selectedDate)
          }
        />
      ) : (
        <Text>
          {orderDate
            ? moment(orderDate).format("DD-MM-YYYY")
            : 'DD-MM-YYYY'} 
        </Text>
      )}
    </TouchableOpacity> */
}

{
  /* <TouchableOpacity
        style={styles.button}
        onPress={() => showDatepicker("order")}
      >
        {showOrderDatePicker && (
          <DateTimePicker
            value={orderDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) =>
              handleOrderDate(event, selectedDate)
            }
          />
        )}

        <Text>{moment(orderDate).format("DD-MM-YYYY")}</Text>
      </TouchableOpacity> */
}

{
  /* <TouchableOpacity
          style={styles.button}
          onPress={() => showDatepicker("delivery")}
        >
          {showDeliveryDatePicker && (
            <DateTimePicker
              value={deliveryDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) =>
                handleDateDelivery(event, selectedDate)
              }
            />
          )}
          <Text>{moment(deliveryDate).format("DD-MM-YYYY")}</Text>

        </TouchableOpacity> */
}
