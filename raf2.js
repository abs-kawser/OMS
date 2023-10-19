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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCustomerInfo } from "../Context/CustomerProvider";
import { Button } from "@rneui/themed";

export default function CreateOrder() {
  const route = useRoute();
  const navigation = useNavigation();
  const customerInfoList = route.params?.customerInfoList;

  console.log("customer Info from Create Order page", customerInfoList);
  //const customerId = route.params?.customerId;

  //check

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
  const [value, setValue] = useState(customerInfoList?.CustomerId);
  //const [dropDown, setDropDown] = useState(null);

  //checking on log
  // console.log("client name ", client);
  // console.log("orderDate name ", orderDate);
  // console.log("deliveryDate name", deliveryDate);
  // console.log("note", note);
  //console.log("value", dropDown);

  //console.log("data", data);
  //console.log("selectedClient check", selectedClient);

  const [showOrderDatePicker, setShowOrderDatePicker] = useState(false);
  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);

  //comeing from contex
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;

  const { customerInformation, setCustomerInformation } = useCustomerInfo();
  console.log("customerIn formation", customerInformation);

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
  // ===============================

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
  // const fetchCreatenewOrderData = async () => {
  //   const requestData = {
  //     CustomerId: value,
  //     OrderDate: orderDate,
  //     DeliveryDate: deliveryDate,
  //     EntryBy: userDetails?.EmpId,
  //     Note: note,
  //     TerritoryId: userDetails?.TerritoryId,
  //   };
  //   console.log("Posting loan data:", JSON.stringify(requestData, null, 2));
  //   const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
  //   const response = await fetch(`${BASE_URL}/api/NewOrderApi/CreateNewOrder`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authHeader,
  //     },
  //     body: JSON.stringify(requestData),
  //   });
  //   // .then(response => response.json())
  //   const result = await response.json();
  //   setOutput(result);
  //   navigation.navigate("Order Details", { data: result });
  //   //navigation.navigate("Order Details", { data: result,dropDown:dropDown });

  //   console.log("this is result", JSON.stringify(result, null, 2));

  //   ToastAndroid.show(result.Status, ToastAndroid.SHORT);
  // };

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

      if (response.status === 200) {
        const result = await response.json();
        setOutput(result);
        navigation.navigate("Order Details", { data: result });
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
      await AsyncStorage.setItem("customerData", JSON.stringify(jsonData));
      setData(jsonData);
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      // setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("customerData");
        if (storedData) {
          setData(JSON.parse(storedData));
          // setLoading(false);
        } else {
          // Data not in AsyncStorage, fetch from API
          try {
            const jsonData = await fetchCustomerData();
            setData(jsonData); // Update state with fetched data
            // setLoading(false);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      } catch (error) {
        console.error("Error reading stored data:", error);
      }
    };

    fetchData();
    //fetchCustomerData();
  }, [userDetails]);

  useEffect(() => {
    setValue(customerInfoList?.CustomerId);

    //setDropDown(item.Name)
  }, [customerInfoList]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.label}>Customer</Text>
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
              labelField="Name"
              valueField="CustomerId"
              placeholder="Select Customer"
              searchPlaceholder="Search..."
              value={value}
              onChange={(item) => {
                setValue(item.CustomerId);
                setCustomerInformation(item);
              }}
              renderItem={(item, index, isSelected) => (
                <View style={styles.dropdownItem}>
                  <Text style={[styles.text, isSelected && styles.boldText]}>
                    Name: <Text style={styles.nameText}>{item.Name}</Text>
                  </Text>
                  <Text style={[styles.text, isSelected && styles.boldText]}>
                    CustomerId:{" "}
                    <Text style={styles.customerIdText}>{item.CustomerId}</Text>
                  </Text>
                  <Text style={[styles.text, isSelected && styles.boldText]}>
                    Address:{" "}
                    <Text style={styles.addressText}>{item.Address}</Text>
                  </Text>
                </View>
              )}
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
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Order Date</Text>
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
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={styles.label}> Delivery Date</Text>
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
        </View>
        {/* ===================================================================================================== */}
        <View style={{ marginTop: 15 }}>
          <Text style={styles.label}>Note</Text>
          <TextInput
            style={[styles.input, { height: 50 }]}
            multiline
            placeholder="Enter notes"
            value={note}
            onChangeText={(text) => setNote(text)}
            //editable={isClientNameValid} // Only editable if client name is valid
          />
        </View>

        {/* <TouchableOpacity
          style={styles.nextButton}
          onPress={fetchCreatenewOrderData} 
        >
         <Text style={styles.nextButtonText}>Nextt</Text>
        </TouchableOpacity> */}
        <Button onPress={fetchCreatenewOrderData}>Next</Button>
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
    color: "black",
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
    borderWidth: 1.5,
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

  dropdown: {
    borderWidth: 1,
    borderColor: "#0096c7",
    borderRadius: 8,
    height: 70, // Reduced the height for a cleaner look
    // backgroundColor: "#fff", // Changed the background color to white
    paddingHorizontal: 10, // Added padding for text inside the dropdown
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999", // Added a subtle color for the placeholder
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333", // Changed the selected text color
  },
  iconStyle: {
    width: 20,
    height: 20, // Reduced the height of the arrow icon
    marginRight: 5,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: "#f1faee", // Added a background color for the search bar
    borderRadius: 4, // Rounded corners for the search bar
    paddingLeft: 10, // Added padding for the search input
  },

  // =====
  dropdownItem: {
    marginLeft: 20,
    paddingHorizontal: 5,
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nameText: {
    color: "#00b4d8",
  },
  customerIdText: {
    color: "green",
  },
  addressText: {
    color: "#22223b",
  },
});