import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLogin } from "../Context/LoginProvider";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import base64 from "base-64";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";

import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function CreateOrder() {
  const route = useRoute();
  const customerId = route.params?.customerId;



  //check

  const navigation = useNavigation();

  const [client, setClient] = useState("");
  const [orderDate, setOrderDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [isClientNameValid, setClientNameValid] = useState(false); // Track client name validity

  const [isClientNameTouched, setClientNameTouched] = useState(false);
  const [error, setError] = useState("");

  const [outPut, setOutput] = useState([]);

  //===//
  const [data, setData] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [value, setValue] = useState(" ");

  //checking on log
  // console.log("client name ", client);
  console.log("orderDate name ", orderDate);
  console.log("deliveryDate name", deliveryDate);
  console.log("note", note);
  //console.log("data", data);
  //console.log("selectedClient check", selectedClient);
  console.log(value);

  const [showOrderDatePicker, setShowOrderDatePicker] = useState(false);
  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);

  //comeing from contex
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;

  // ================================================
  const handleOrderDate = (event, selectedDate) => {
    // if (selectedDate) {
    //   setShowOrderDatePicker(false);
    //   const newDate = new Date(selectedDate);
    //   setOrderDate(newDate);
    // }
    setShowOrderDatePicker(false);
    if (selectedDate) {
      setOrderDate(selectedDate);
      // Attempt to set the delivery date
      if (selectedDate > deliveryDate) {
        setError("Delivery date cannot be earlier than order date");
      } else {
        // Throw an error if the delivery date is earlier than the order date
        setError("");
      }
    }
  };

  const handleDateDelivery = (event, selectedDate) => {
    // if (selectedDate) {
    //   setShowDeliveryDatePicker(false);
    //   const newDate = new Date(selectedDate);
    //   setDeliveryDate(newDate);
    // }
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

  const onClientNameChange = (text) => {
    const isValid = text.trim() !== "";
    setClientNameValid(isValid);
    setClient(text);
  };

  const onClientNameBlur = () => {
    setClientNameTouched(true);
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
      CustomerId: value,
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
    setOutput(result);
    navigation.navigate("Create Order ", { data: result });
    console.log("this is result", JSON.stringify(result, null, 2));
    ToastAndroid.show(result.Status, ToastAndroid.SHORT);
  };

  //customert api call
  const fetchCustomerData = async () => {
    try {
      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
      const response = await fetch(
        `${BASE_URL}/api/CustomerApi/GetAllCustomer?territoryId=${
          userDetails?.TerritoryId
        }&scId=${userDetails.ScId !== null ? userDetails.ScId : 1}`,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      const jsonData = await response.json();
      console.log(
        "this from create order page ",
        JSON.stringify(jsonData, null, 2)
      );
      //await AsyncStorage.setItem('ApprovalSummary', JSON.stringify(jsonData));

      setData(jsonData);

      //setFilteredData(jsonData);
      //setIsLoggedIn(true);
      //return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      // setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.label}>Client Name:</Text>
          <TouchableOpacity>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={500}
              labelField="Name" // Display as "Name"
              valueField="CustomerId" // Store CustomerId
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              // onChange={(item) => {
              //   setValue(item.Name);
              // }}

              onChange={(item) => {
                setValue(item.CustomerId); // Store the CustomerId in the state
              }}
            />
          </TouchableOpacity>

          {/* 
          {isClientNameTouched && !isClientNameValid && client === "" && (
            <Text style={styles.errorMessage}>Client name is required ***</Text>
          )} */}

          {/* <View style={styles.input}>
            <Picker
              selectedValue={selectedClient}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedClient(itemValue)
              }
            >
              <Picker.Item label="Select name" value="select name" />
              {data?.map((items, index) => (
                <Picker.Item
                  label={items.Name}
                  value={items.CustomerId}
                  key={index}
                />
              ))}
            </Picker>
          </View> */}
        </View>

        {/* Display error message */}

        {/* ================================================================= */}
        <Text style={styles.label}>Order Date:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showDatepicker("order")}
          //disabled={!isClientNameValid} // Disable if client name is not valid
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
          <Text>{moment(orderDate).format("DD-MM-YYYY")}</Text>
        </TouchableOpacity>

        <Text style={styles.label}> Delivery Date:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => showDatepicker("delivery")}
          //disabled={!isClientNameValid} // Disable if client name is not valid
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
          <Text>{moment(deliveryDate).format("DD-MM-YYYY")}</Text>
        </TouchableOpacity>
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        {/* ===================================================================================================== */}

        <Text style={styles.label}>Note:</Text>
        <TextInput
          style={[styles.input, { height: 50 }]}
          multiline
          placeholder="Enter notes"
          value={note}
          onChangeText={(text) => setNote(text)}
          //editable={isClientNameValid} // Only editable if client name is valid
        />

        <TouchableOpacity
          style={styles.nextButton}
          //onPress={handleNextButton((onSubmit))}
          onPress={fetchCreatenewOrderData} // Use handleSubmit here
          //disabled={!isClientNameValid} // Disable if client name is not valid
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
    marginBottom: 16,
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

  //========
  dropdown: {
    // margin: 16,
    // height: 50,
    // borderBottomColor: 'gray',
    // borderBottomWidth: 0.5,

    borderWidth: 1,
    borderColor: "#0096c7",
    borderRadius: 8,
    height: 80,
    backgroundColor: "#f1faee",
    justifyContent: "center",
    marginBottom: 16,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 25,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
