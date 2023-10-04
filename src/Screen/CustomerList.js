import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import base64 from "base-64";
import { useLogin } from "../Context/LoginProvider";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

export default function CustomerList() {
  const navigation = useNavigation();

  const rainbowColors = ["#9bf6ff", "#f3ffbd"];
  //"#80ffdb", "#e0c3fc", "#90e0ef"

  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //filter part
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Filter data based on the search term
    const filtered = data.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  //fetch api
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
      console.log(JSON.stringify(jsonData, null, 2));
      //await AsyncStorage.setItem('ApprovalSummary', JSON.stringify(jsonData));
      setData(jsonData);
      setFilteredData(jsonData);
      setIsLoading(false);
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

  // Filter the data based on the search term
  //implement search logic

  return (
    <>
      {/* implement search  part*/}
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            onChangeText={(text) => setSearchTerm(text)}
          />
          <Icon
            name="search" // Font Awesome icon name
            size={24}
            style={styles.icon}
          />
        </View>
        
       <View style={styles.headerAndButton}>
       <Text style={styles.header}>Customer  List </Text>
         <TouchableOpacity>
            <Button>Create Order</Button>
         </TouchableOpacity>
       </View>
        <ScrollView>
          {filteredData.map((Customer, index) => (
            <TouchableOpacity>
              <View
                key={index}
                style={[
                  styles.productCard,
                  {
                    backgroundColor:
                      rainbowColors[index % rainbowColors.length],
                  },
                ]}
              >
                <Text style={styles.productName}> {Customer.Name}</Text>
                <Text style={styles.productInfo}>
                  <Text style={{ fontWeight: "bold" }}>Customer Id: </Text>
                  {Customer.CustomerId}
                </Text>

                <Text style={styles.productInfo}>
                  <Text style={{ fontWeight: "bold" }}>Depot Name: </Text>
                  {Customer.DepotName}
                </Text>
                <Text style={styles.productInfo}>
                  <Text style={{ fontWeight: "bold" }}>Address: </Text>
                  {Customer.Address}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    padding: 16,
  },
  headerAndButton:{
    flexDirection: "row",
    justifyContent: "space-between",
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
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
    // marginLeft: 22,
    // width: "90%",
    // backgroundColor: "white",
    // borderRadius: 5,
    // padding: 15,
    // marginBottom: 16,
    // elevation: 2,
    // shadowColor: "rgba(0, 0, 0, 0.2)",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 1,
    // shadowRadius: 2,
    // borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productInfo: {
    marginTop: 8,
  },
  tradeLicense: {
    marginTop: 8,
    color: "green", // You can customize the color as needed
  },

  // containerx: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // text: {
  //   color: "blue", // You can change 'blue' to any color you like
  //   fontSize: 18,
  //   fontWeight: "normal", // You can adjust the font weight as needed
  // },

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
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
});
