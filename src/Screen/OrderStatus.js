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

  const { customerInformation, setCustomerInformation } = useCustomerInfo();

  const [showOrderDatePicker, setShowOrderDatePicker] = useState(false);
  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);
  const [error, setError] = useState("");
  const [orderDate, setOrderDate] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const [customerId, setCustomerId] = useState();
  console.log("customerID", customerId);
  // context

  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;

  //const [orderDate, setOrderDate] = useState(new Date());
  //const [deliveryDate, setDeliveryDate] = useState(new Date());

  const showOrderDatepicker = () => {
    setShowOrderDatePicker(true);
  };

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
    if (selectedDate) {
      const dateTime = moment(selectedDate);
      const gmtTime = dateTime.utc().add(1, "days");

      console.log(gmtTime.toLocaleString());

      setOrderDate(selectedDate);
      // Attempt to set the delivery date
      if (selectedDate > deliveryDate) {
        // setError("Delivery date cannot be earlier than order date");
      } else {
        setError("");
      }
    }
  };

  const handleDateDelivery = (event, selectedDate) => {
    setShowDeliveryDatePicker(false);
    if (selectedDate) {
      const dateTime = moment(selectedDate);
      const gmtTime = dateTime.utc().add(1, "days");

      console.log(gmtTime.toLocaleString());
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
  // ===============================

  // Api caaling

  const fetchOrderStatus = async () => {
    try {
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

      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
      const response = await fetch(
        `${BASE_URL}/api/OrdersStatusCheckingAPI/GetOrdersStatus?EmpId=${
          userDetails.EmpCode
        }&OrderDate=${orderDate
          .toLocaleString()
          .substring(0, 10)}&DeliveryDate=${deliveryDate
          .toLocaleString()
          .substring(0, 10)}&CustomerId=${customerId}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );

      if (!response.ok) {
        setError("An error occurred while fetching data.");
        console.log(response.statusText);
      } else {
        setError(""); // Clear the error state
        const jsonData = await response.json();

        if (jsonData.status === "No Data Found !") {
          // setError(jsonData.status);
          ToastAndroid.show(jsonData.status, ToastAndroid.SHORT);
        } else {
          navigation.navigate("Order Status Info", { OrderStatus: jsonData });
        }
      }

      // console.log(response);
      // const jsonData = await response.json();
      // console.log(JSON.stringify(jsonData, null, 2));
      // navigation.navigate("Order Status Info", { OrderStatus: jsonData });
      //await AsyncStorage.setItem('ApprovalSummary', JSON.stringify(jsonData));
      // setData(jsonData);
      // setFilteredData(jsonData);
      // setIsLoading(false);
      //return jsonData;
    } catch (error) {
      setError("Please fill up all fields");
      console.error("Error fetching data:", error);

      throw error;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setOrderDate(null);
      setDeliveryDate(null);
      setCustomerId("");
      setError("");
    }, [])
  );

  // useEffect(() => {
  //   if (customerInformation?.CustomerId) {
  //     setCustomerId(customerInformation.CustomerId);
  //   }
  // }, [customerInformation]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Order Date</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showOrderDatepicker()}
        >
          <Text>
            {orderDate ? moment(orderDate).format("DD-MM-YYYY") : "DD-MM-YYYY"}
          </Text>
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={showOrderDatePicker}
          onRequestClose={() => setShowOrderDatePicker(false)}
        >
          <View>
            <DateTimePicker
              value={orderDate || new Date()}
              mode="date"
              display="default"
              style={{ height: 50 }}
              onChange={(event, selectedDate) =>
                handleOrderDate(event, selectedDate)
              }
            />
          </View>
        </Modal>
      </View>

      {/* delivery date */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}> Delivery Date</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => showDatepicker("delivery")}
        >
          {showDeliveryDatePicker ? (
            <DateTimePicker
              value={deliveryDate || new Date()} // Use a default date if deliveryDate is null
              mode="date"
              display="default"
              onChange={(event, selectedDate) =>
                handleDateDelivery(event, selectedDate)
              }
            />
          ) : (
            <Text>
              {deliveryDate
                ? moment(deliveryDate).format("DD-MM-YYYY")
                : "DD-MM-YYYY"}
              {/* Show placeholder if deliveryDate is null */}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* ===================================================================================================== */}

      {/* Customer ID Input */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>
          Customer ID
          {/* ({customerInformation?.CustomerId}) */}
        </Text>
        <TextInput
          style={[styles.input, { height: 50 }]}
          mode="outlined"
          label="Customer ID"
          placeholder="Enter customer ID"
          placeholderTextColor="black"
          onChangeText={(text) => setCustomerId(text)}
          keyboardType="numeric"
          value={customerId}
          // value={customerId}
        />
        
      {error ? (
        <Text
          style={{
            color: "red",
            marginLeft:10,
            fontSize: 15,
             // marginTop: 20,
             // alignSelf: "center",
            // fontWeight: "700",
            // fontFamily: "Roboto-bold",
          }}
        >
          {error}
        </Text>
      ) : null}
        {/* Search Button */}
        <Button
          mode="contained"
          style={styles.searchButton}
          onPress={fetchOrderStatus}
        >
          Search
        </Button>
      </View>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  input: {
    // borderWidth: 1,
    // borderColor: "#0096c7",
    // borderRadius: 5,
    // padding: 10,
    // marginBottom: 16,
    // fontSize: 16,
    // width:"33%",
    // height:40

    borderWidth: 1,
    borderColor: "#0096c7",
    borderRadius: 5,
    height: 40,
    // backgroundColor: '#FFFFFF',
    justifyContent: "center",
    // marginBottom: 16,
  },

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
    // borderWidth: 1,
    // borderColor: "#0096c7",
    // borderRadius: 5,
    // padding: 10,
    // marginBottom: 16,
    // fontSize: 16,
    // width:"33%",
    // height:40

    borderWidth: 1,
    borderColor: "#0096c7",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    marginBottom: 16,
  },

  button: {
    borderWidth: 1,
    borderColor: "#7209b7",
    borderRadius: 5,
    padding: 10,

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
