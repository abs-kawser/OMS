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

export default function CreateOrder() {
  const navigation = useNavigation();
  const { control,  errors } = useForm();

  const [client, setClient] = useState("");
  const [orderDate, setOrderDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [note, setNote] = useState("");

  //checking on log
  console.log("client name ", client);
  console.log("orderDate name ", orderDate);
  console.log("deliveryDate name", deliveryDate);
  console.log("note", note);

  // const [date, setDate] = useState(new Date());
  // const [showDatePicker, setShowDatePicker] = useState(false);

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


  
  const handleNextButton = () => {
    fetchCreatenewOrderData();

    navigation.navigate("CreateOrderDetails");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        

        <Text style={styles.label}>Client Name:</Text>
        <TextInput
          //style={styles.input}
          style={[styles.input, { height: 100 }]}

          placeholder="Enter client name"
          value={client}
          onChangeText={(text) => setClient(text)}
        />


{/*       
  <Text style={styles.label}>Client Name:</Text>
  <Controller
    name="client"
    control={control}
    defaultValue=""
    rules={{ required: "client name is required" }}
    render={({ field }) => (
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter client name"
        onChangeText={field.onChange}
        value={field.value}
      />
    )}
  />
  {errors.client && (
    <Text style={{ color: "red" }}>{errors.client.message}</Text>
  )} */}

{/* ================================================================= */}
        <Text style={styles.label}>Order Date:</Text>
        <TouchableOpacity
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
          <Text>Order Date: {orderDate.toLocaleString()}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Delivery Date:</Text>
        <TouchableOpacity
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
          <Text>Delivery Date: {deliveryDate.toLocaleString()}</Text>
        </TouchableOpacity>

        {/* ===================================================================================================== */}

        <Text style={styles.label}>Note:</Text>
        <TextInput
          style={[styles.input, { height: 50 }]}
          multiline
          placeholder="Enter notes"
          value={note}
          onChangeText={(text) => setNote(text)}
        />

        <TouchableOpacity style={styles.nextButton} onPress={handleNextButton}>
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
});
