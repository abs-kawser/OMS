import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLogin } from "../Context/LoginProvider";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import base64 from "base-64";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";

export default function CreateOrder() {
  const navigation = useNavigation();
  //const { control,  errors } = useForm();
  // const { control, handleSubmit, errors, setValue, watch } = useForm({
  //   defaultValues: {
  //     client: "", // Provide default value for client
  //   },
  // });

  const [client, setClient] = useState("");
  const [orderDate, setOrderDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [isClientNameValid, setClientNameValid] = useState(false); // Track client name validity

  const [isClientNameTouched, setClientNameTouched] = useState(false);

  //checking on log
  console.log("client name ", client);
  console.log("orderDate name ", orderDate);
  console.log("deliveryDate name", deliveryDate);
  console.log("note", note);

  const [showOrderDatePicker, setShowOrderDatePicker] = useState(false);
  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);

  //comeing from contex
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;

  // ================================================
  const handleOrderDate = (event, selectedDate) => {
    if (selectedDate) {
      setShowOrderDatePicker(false);
      const newDate = new Date(selectedDate);
      setOrderDate(newDate);
    }
  };

  const handleDateDelivery = (event, selectedDate) => {
    if (selectedDate) {
      setShowDeliveryDatePicker(false);
      const newDate = new Date(selectedDate);
      setDeliveryDate(newDate);
    }
  };

  // ===========================================

  //
  const showDatepicker = (type) => {
    if (type === "order") {
      setShowOrderDatePicker(true);
    } else if (type === "delivery") {
      setShowDeliveryDatePicker(true);
    }
  };

  // ========= api calling =========
  const fetchCreatenewOrderData = async () => {
    const requestData = {
      CustomerId: 318233,
      OrderDate: orderDate,
      DeliveryDate: deliveryDate,
      EntryBy: userDetails?.EmpId,
      Note: note,
      TerritoryId: userDetails?.TerritoryId,
    };

    console.log("Posting loan data:", JSON.stringify(requestData, null, 2));

    const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);

    const response = await fetch(`${BASE_URL}/api/NewOrderApi/CreateNewOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(requestData),
    });
    // .then(response => response.json())
    const result = await response.json();
    console.log("this is result", JSON.stringify(result, null, 2));

    ToastAndroid.show(result.Status, ToastAndroid.SHORT);
  };

  // const onClientNameChange = (text) => {
  //   // Validate client name here, for example, check if it's not empty
  //   const isValid = text.trim() !== "";
  //   setClientNameValid(isValid);
  //   setClient(text);
  // };

  const onSubmit = () => {
    // Move your form submission logic here
    if (isClientNameValid) {
      fetchCreatenewOrderData();
      navigation.navigate("CreateOrderDetails");
    }
  };

  const onClientNameChange = (text) => {
    const isValid = text.trim() !== "";
    setClientNameValid(isValid);
    setClient(text);
  };

  const onClientNameBlur = () => {
    setClientNameTouched(true);
  };

  //=================================
  // const handleNextButton = () => {
  //   fetchCreatenewOrderData();

  //   navigation.navigate("CreateOrderDetails");
  // };

  //========================
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* old code  */}
        {/* <Text style={styles.label}>Client Name:</Text>
        <TextInput
          //style={styles.input}
          style={[styles.input, { height: 100 }]}

          placeholder="Enter client name"
          value={client}
          onChangeText={(text) => setClient(text)}
        /> */}

       

        {/* {!isClientNameValid && client === "" && (
  <Text style={styles.errorMessage}>Client name is required ***</Text>
)} */}

        <Text style={styles.label}>Client Name:</Text>
        {isClientNameTouched && !isClientNameValid && client === "" && (
          <Text style={styles.errorMessage}>Client name is required ***</Text>
        )}

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter client name"
          onChangeText={onClientNameChange}
          value={client}
          onBlur={onClientNameBlur}

          //  style={[styles.input, { height: 100 }]}
          //  placeholder="Enter client name"
          //  onChangeText={onClientNameChange}
          //  value={client}
          //  onBlur={onClientNameBlur}

          // style={[styles.input, { height: 100 }]}
          // placeholder="Enter client name"
          // onChangeText={onClientNameChange}
          // value={client}
        />

        {/* Display error message */}

        {/* ================================================================= */}
        <Text style={styles.label}>Order Date:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showDatepicker("order")}
          disabled={!isClientNameValid} // Disable if client name is not valid
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

          {/* <Text>Order Date: {orderDate.toLocaleString()}</Text> */}
          <Text>Order Date: {moment(orderDate).format("YYYY-MM-DD")}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Delivery Date:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showDatepicker("delivery")}
          disabled={!isClientNameValid} // Disable if client name is not valid
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
          {/* <Text>Delivery Date: {deliveryDate.toLocaleString()}</Text> */}
          <Text>
            Delivery Date: {moment(deliveryDate).format("YYYY-MM-DD")}
          </Text>
        </TouchableOpacity>

        {/* ===================================================================================================== */}

        <Text style={styles.label}>Note:</Text>
        <TextInput
          style={[styles.input, { height: 50 }]}
          multiline
          placeholder="Enter notes"
          value={note}
          onChangeText={(text) => setNote(text)}
          editable={isClientNameValid} // Only editable if client name is valid
        />

        <TouchableOpacity
          style={styles.nextButton}
          //onPress={handleNextButton((onSubmit))}
          onPress={onSubmit} // Use handleSubmit here
          disabled={!isClientNameValid} // Disable if client name is not valid
        >
          <Text style={styles.nextButtonText}>Nextt</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#0096c7",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },

  nextButton: {
    backgroundColor: "#0096c7", // Light blue background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "flex-end", // Align button to the left
    marginTop: "auto",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", // Text color
  },

  button: {
    borderWidth: 1,
    borderColor: "#0096c7",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  errorMessage: {
    color: "red",
    fontSize: 18,
    marginTop: 5, // Adjust the spacing from the input field
    //fontStyle: 'italic', // You can use italic for error messages
  },
});
