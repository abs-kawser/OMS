import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import base64 from "base-64";
import { useLogin } from "../Context/LoginProvider";
import { useNavigation } from "@react-navigation/native";
// import { Button } from "react-native-paper";

import { Button } from "@rneui/themed";
import { useCustomerInfo } from "../Context/CustomerProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import axios from "axios";

export default function CustomerList() {
  const rainbowColors = ["#9bf6ff", "#f3ffbd"];

  const navigation = useNavigation();

  const { customerInformation, setCustomerInformation } = useCustomerInfo();
  const { isLoggedIn, setIsLoggedIn } = useLogin();

  const { userDetails } = isLoggedIn;
  console.log("userDetails", JSON.stringify(userDetails, null, 2));

  const [data, setData] = useState([]);
  //console.log("data from customerApi", data);

  //Loading
  const [isLoading, setIsLoading] = useState(true);

  //filter part
  const [filteredData, setFilteredData] = useState([data]);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize with null

  useEffect(() => {
    // Filter data based on the search term
    const filtered = data.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  //fetch customer api
  const fetchCustomerData = async () => {
    try {
      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);

      // const response = await fetch(
      //   `${BASE_URL}/api/CustomerApi/GetAllCustomer?territoryId=${
      //     userDetails?.TerritoryId
      //   }&scId=${userDetails?.ScId !== null ? userDetails?.ScId : 1}`,
      //   {
      //     headers: {
      //       Authorization: authHeader,
      //     },
      //   }
      // );     ${userDetails?.ScId !== null ? userDetails?.ScId : 1}
      const apiUrl = `${BASE_URL}/api/CustomerApi/GetAllCustomer?territoryId=${userDetails?.TerritoryId}`;
      console.log("API URL:", apiUrl);
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: authHeader,
        },
      });

      const jsonData = await response.json();
      console.log(JSON.stringify("fetch json data  ", jsonData, null, 2));
      await AsyncStorage.setItem("customerData", JSON.stringify(jsonData));
      //await AsyncStorage.setItem('ApprovalSummary', JSON.stringify(jsonData));
      setData(jsonData);
      setFilteredData(jsonData);
      setIsLoading(false);
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      // setIsLoading(false);
      //throw error;
    }
  };

  // const fetchCustomerData = async () => {
  //   const apiUrl = 'http://184.168.127.174:6565/api/CustomerApi/GetAllCustomer?territoryId=46&scId=1';
  //   const USERNAME = 'OMS';
  //   const PASSWORD = '123456';

  //   try {
  //     // Create an Authorization header with the encoded credentials
  //     const authHeader = 'Basic ' + base64.encode(USERNAME + ':' + PASSWORD);
  //     const headers = new Headers();
  //     headers.set('Authorization', authHeader);

  //     // Fetch data from the API using the Authorization header
  //     const response = await fetch(apiUrl, {
  //       method: 'GET',
  //       headers: headers,
  //     });

  //     // Check if the response is successful (status code 200)
  //     if (response.ok) {
  //       // Parse the response JSON
  //       const data = await response.json();
  //       console.log('API Response:', data);
  //       return data;
  //     } else {
  //       // Handle non-successful responses
  //       console.error('Error fetching API:', response.status, response.statusText);
  //       return null;
  //     }
  //   } catch (error) {
  //     // Handle any network errors
  //     console.error('Network error:', error.message);
  //     return null;
  //   }
  // };

  //============useing axious ================//
  // const fetchCustomerData = async () => {
  //   try {
  //     const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);

  //     const response = await axios.get(
  //       `${BASE_URL}/api/CustomerApi/GetAllCustomer?territoryId=${
  //         userDetails?.TerritoryId
  //       }&scId=${userDetails.ScId !== null ? userDetails.ScId : 1}`,
  //       {
  //         headers: {
  //           Authorization: authHeader,
  //         },
  //       }
  //     );

  //     const jsonData = response.data; // Axios response data is directly available as `data` property
  //     console.log(JSON.stringify(jsonData, null, 2));
  //     await AsyncStorage.setItem("customerData", JSON.stringify(jsonData));
  //     // await AsyncStorage.setItem('ApprovalSummary', JSON.stringify(jsonData));
  //     setData(jsonData);
  //     setFilteredData(jsonData);
  //     setIsLoading(false);
  //     return jsonData;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setIsLoading(false);
  //     // setIsLoading(false);
  //     throw error;
  //   }
  // };

  useEffect(() => {
    // Fetch data from AsyncStorage
    AsyncStorage.getItem("customerData")
      .then((storedData) => {
        if (storedData) {
          const jsonData = JSON.parse(storedData);
          setData(jsonData);
          setFilteredData(jsonData);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error retrieving data from AsyncStorage:", error);
      });

    // Fetch data from the API
    fetchCustomerData();
  }, []);

  const CreateOrder = (customerInfoList) => {
    navigation.navigate("Create Order", { customerInfoList: customerInfoList });
    setCustomerInformation(customerInfoList);
  };

  // useEffect(() => {
  //   fetchCustomerData();
  // }, []);

  return (
    <>
      {/* implement search  part*/}
      <View style={styles.container}>

        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter customer name..."
            placeholderTextColor="#001427"
            onChangeText={(text) => setSearchTerm(text)}
          />
          <Icon
            name="search" // Font Awesome icon name
            size={24}
            style={styles.icon}
          />
        </View>

        <View style={styles.headerAndButton}>
          {/* <Text style={styles.header}>Customer List </Text> */}
          <TouchableOpacity>
            {/* <Button onPress={CreateOrder}>Create  Order</Button> */}
          </TouchableOpacity>
        </View>

        {isLoading ? (
          // <ActivityIndicator
          //   size="large"
          //   color="#0000ff"
          //   // colors={COLORS.primary}
          //   style={styles.activityIndicator}
          // />

          <View style={styles.loadingContainer}>
            {/* <ActivityIndicator size="large" color="#0077b6" /> */}
            <LottieView
              source={require("../../Lottie/Animation6.json")} // Replace with your animation file path
              autoPlay
              loop
              style={styles.lottiContainer}
            />
          </View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(Customer, index) => index.toString()} // You can use a more unique key if available
            keyboardShouldPersistTaps="handled"
            renderItem={({ item: Customer, index }) => (
              <View
                style={[
                  styles.productCard,
                  {
                    backgroundColor:
                      rainbowColors[index % rainbowColors.length],
                  },
                ]}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.productName}>{Customer?.Name}</Text>
                  <Text style={styles.productInfo}>
                    ({Customer.CustomerId})
                  </Text>
                </View>

                <Text style={styles.Address}>
                  <Text>Address:</Text> {Customer?.Address}
                </Text>

                <Text style={styles.DepotName}>
                  <Text>Depot Name:</Text> {Customer?.DepotName}
                </Text>

                <View style={{ alignSelf: "flex-start" }}>
                  <Button
                    title="Create Order"
                    // buttonStyle={{ backgroundColor: "rgba(127, 220, 103, 1)" }}
                    containerStyle={{
                      height: 40,
                      marginTop: 20,
                      borderRadius: 25,
                    }}
                    titleStyle={{
                      color: "#ebf2fa",
                    }}
                    onPress={() => CreateOrder(Customer)}
                  />
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* total */}
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>
          Total: {filteredData ? filteredData.length : data.length}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#caf0f8",
    padding: 16,
  },
  headerAndButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  header: {
    // fontSize: 20,
    // fontWeight: "bold",
    // marginBottom: 16,
    // marginLeft: 16,

    fontSize: 20,
    marginBottom: 16,
    marginLeft: 15,
    fontWeight: "700",
    fontFamily: "Roboto-bold",
    color: "black",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 16,
    color: "black",

    // fontWeight: "bold",
  },
  productInfo: {
    color: "black",

    //  marginTop: 8,
  },
  tradeLicense: {
    marginTop: 5,
    color: "black", // You can customize the color as needed
  },

  bottomTextContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#caf0f8",
    padding: 2,
    alignSelf: "center",
  },
  bottomText: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },

  inputContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    // borderColor: "gray",
    // borderWidth: 1,
    // margin: 10,
    // padding: 5,

    flexDirection: "row",
    alignItems: "center",
    borderColor: "#242423",
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderRadius: 15,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
    color: "black",
  },
  icon: {
    marginRight: 10,
    opacity: 0.5,
  },

  textContainer: {
    flexDirection: "row",
    gap: 5,
  },
  DepotName: {
    marginTop: 10,
    color: "black",
  },
  Address: {
    marginTop: 10,
    color: "black",
  },
  loadingContainer: {
    alignSelf: "center",
    flex: 1,
    // justifyContent:"center",
    // alignItems:"center"
  },
  lottiContainer: {
    height: 50,
    width: 50,
  },
});
