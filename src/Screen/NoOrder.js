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
import { useFocusEffect } from "@react-navigation/native";
// import Toast from "react-native-toast-notifications";
import { useToast } from "react-native-toast-notifications";

const NoOrder = () => {
  // toast message
  const toast = useToast();
  const route = useRoute();

  const navigation = useNavigation();
  //comeing from contex
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;

  const customerInfoList = route.params?.customerInfoList;

  console.log("customer Info from Create Order page", customerInfoList);
  console.log("CustomerId value", value);
  console.log("orderDate", orderDate);

  const [data, setData] = useState([]);
  const [value, setValue] = useState(customerInfoList?.CustomerId);
  const [orderDate, setOrderDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [note, setNote] = useState("");

  //take sate for validtion
  const [error, setError] = useState("");
  const [customerError, setCustomerError] = useState("");
  const [noteError, setNoteError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [outPut, setOutput] = useState([]);
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

  const { customerInformation, setCustomerInformation } = useCustomerInfo();
  console.log(
    "customerIn formation",
    JSON.stringify(customerInformation, null, 2)
  );

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

  // ===========================================

  //
  const showDatepicker = (type) => {
    if (type === "order") {
      setShowOrderDatePicker(true);
    } else if (type === "delivery") {
      setShowDeliveryDatePicker(true);
    }
  };

  //===================customert api call==============================================

  const fetchCustomerData = async () => {
    try {
      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
      // const response = await fetch(
      //   `${BASE_URL}/api/CustomerApi/GetAllCustomer?territoryId=${
      //     userDetails?.TerritoryId
      //   }&scId=${userDetails.ScId !== null ? userDetails.ScId : 1}`,
      //   {
      //     headers: {
      //       Authorization: authHeader,
      //     },
      //   }
      // );
      const apiUrl = `${BASE_URL}/api/CustomerApi/GetAllCustomer?territoryId=${userDetails?.TerritoryId}`;
      console.log("API URL:", apiUrl);
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: authHeader,
        },
      });
      const jsonData = await response.json();
      // console.log(
      //   "this from create order page ",
      //   JSON.stringify(jsonData, null, 2)
      // );
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

  //=======================no order api calling ==========

  const fetchNorderData = async () => {
    const requestBody = {
      CustomerId: value,
      OrderDate: orderDate,
      EntryDateTime: deliveryDate,
      Note: note,
      Status: 1,
      EntryBy: 1,
      TerritoryId: userDetails?.TerritoryId,
      SCId: userDetails?.ScId,
    };

    try {

        // Check if delivery date is earlier than order date
  if (deliveryDate < orderDate) {
    setError("Delivery date cannot be earlier than order date");
    return;
  }

      if (!value || !note || !deliveryDate || !orderDate) {
        // setError('Please fill in both username and password fields');
        ToastAndroid.show(
          "Please fill up all input fields",
          ToastAndroid.SHORT
        );
        return;
      }

      // if (!value || !note || !deliveryDate || !orderDate) {
      //   toast.show("Please fill up all fields❌", {
      //     type: "normal",
      //     duration: 2000,
      //   });
      //   //toast.show('successfully submited',{type: 'normal', duration: 2000});

      //   return;
      // }

      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
      const response = await fetch(`${BASE_URL}/api/NoOrderApi/CreateNoOrder`, {
        method: "POST", // Specify the HTTP method
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const jsonData = await response.json();
      if (jsonData.Success === true) {
        // ToastAndroid.show(jsonData.Message, ToastAndroid.SHORT);
        toast.show("successfully submited", {
          type: "success",
          duration: 2000,
        });
      }

      // if (jsonData.Success === true) {
      //  toast.show(jsonData.Message , {type: 'normal', duration: 1000});

      // }

      console.log(
        "this from create order page ",
        JSON.stringify(jsonData, null, 2)
      );

      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  //field clearing

  useFocusEffect(
    React.useCallback(() => {
      setValue("");
      setOrderDate(new Date());
      setDeliveryDate(new Date());
      setNote("");
    }, [])
  );

  //==========================||==============================//

  return (
    <ScrollView style={styles.container}>
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
            maxHeight={800}
            labelField="Name"
            valueField="CustomerId"
            placeholder="Select Customer"
            searchPlaceholder="Search..."
            value={value}
            onChange={(item) => {
              setValue(item.CustomerId);
              setCustomerInformation(item);
              setCustomerError("");
            }}
            renderItem={(item, index, isSelected) => (
              // <View style={styles.dropdownItem}>
              <>
                <View
                  style={[
                    styles.dropdownItem,
                    isSelected && styles.selectedItem,
                  ]}
                >
                  <Text style={[styles.text, isSelected && styles.boldText]}>
                    Name: <Text style={styles.nameText}>{item.Name}</Text>
                  </Text>
                  <Text style={[styles.text, isSelected && styles.boldText]}>
                    Customer Id:
                    <Text style={styles.customerIdText}>{item.CustomerId}</Text>
                  </Text>
                  <Text style={[styles.text, isSelected && styles.boldText]}>
                    Address:{" "}
                    <Text style={styles.addressText}>{item.Address}</Text>
                  </Text>
                </View>
              </>
            )}
          />
        </TouchableOpacity>

        {/* {isClientNameTouched && !isClientNameValid && client === "" && (
            <Text style={styles.errorMessage}>Client name is required ***</Text>
          )} */}
      </View>

      {customerError && <Text style={{ color: "red" }}>{customerError}</Text>}

      {/* ================================================================= */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Order Date</Text>
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
          <Text style={{ color: "black" }}>
            {moment(orderDate).format("DD-MM-YYYY")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={styles.label}> Delivery Date</Text>
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

          <Text style={{ color: "black" }}>
            {moment(deliveryDate).format("DD-MM-YYYY")}
          </Text>
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
          placeholderTextColor="black"
          value={note}
          onChangeText={(text) => {
            setNote(text);
            setNoteError("");
          }}
        />
        {noteError ? <Text style={{ color: "red" }}>{noteError}</Text> : null}
      </View>

      {/* <TouchableOpacity
          style={styles.nextButton}
          onPress={fetchCreatenewOrderData} 
        >
         <Text style={styles.nextButtonText}>Nextt</Text>
        </TouchableOpacity> */}
      <TouchableOpacity style={{ marginTop: 25 }}>
        <Button color="#2E97A7" onPress={fetchNorderData}>
          Submit
        </Button>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NoOrder;

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
    borderWidth: 1,
    borderColor: "#0096c7",
    borderRadius: 5,
    height: 40,
    // backgroundColor: '#FFFFFF',
    justifyContent: "center",

    // marginBottom: 16,
  },

  nextButton: {
    backgroundColor: "#0096c7", // Light blue background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "flex-end", // Align button to the left
    marginTop: 20,
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
    marginTop: 5,
    // Adjust the spacing from the input field
    //fontStyle: 'italic', // You can use italic for error messages
  },

  dropdown: {
    borderWidth: 1,
    borderColor: "#0096c7",
    borderRadius: 8,
    height: 70,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "black",
    // fontStyle: "italic",
    // A slightly darker shade for better visibility
    // Italics for a stylish touch
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  iconStyle: {
    // width: 20,
    // height: 20,
    // marginRight: 5,
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: "#3498DB", // A shade of blue for the icon color
  },

  inputSearchStyle: {
    height: 60,
    fontSize: 16,
    backgroundColor: "#9bf6ff", // Light gray background color
    borderRadius: 8,
    paddingLeft: 15,
    // borderWidth: 1,
    borderColor: "#9bf6ff", // A slightly darker shade for the border
  },
  //it's  fine
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
    backgroundColor: "#f3ffbd",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 2,
  },

  // ... other styles
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#03071e",
    // fontWeight: "700",
    // fontFamily: "Roboto-bold",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nameText: {
    // color: "#00b4d8",
    // color:"white"
    color: "#03071e",
    // fontWeight: "700",
    // fontFamily: "Roboto-bold",
  },
  customerIdText: {
    // color: "green",
    // color:"white"
    color: "#03071e",
    // fontWeight: "700",
    // fontFamily: "Roboto-bold",
  },
  addressText: {
    // color: "#22223b",
    color: "#03071e",
    // fontWeight: "700",
    // fontFamily: "Roboto-bold",
  },
  selectedItem: {
    backgroundColor: "lightblue",
  },
});



//const customerId = route.params?.customerId;
//check
//   const [client, setClient] = useState("");
//   const [isClientNameValid, setClientNameValid] = useState(false);
//   const [isClientNameTouched, setClientNameTouched] = useState(false);
//   const [customerSelected, setCustomerSelected] = useState(false);
//===//
