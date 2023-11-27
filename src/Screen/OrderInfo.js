import { StyleSheet, Text, View, ScrollView } from "react-native";

import { BASE_URL, PASSWORD, USERNAME } from "../../varible";
import base64 from "base-64";
import React, { useState, useMemo, useEffect } from "react";
import { Button } from "react-native-paper";

const OrderInfo = ({ route, navigation }) => {
  const orderNo = route.params?.orderNo;
  console.log("orderNo ", orderNo);

  const [data, setData] = useState(null);

  //======================= Order info   Api Calling ==========================
  const fetchOrderInfoData = async () => {
    try {
      const url = `${BASE_URL}/api/NewOrderApi/GetPoInfo?orderNo=${orderNo}&verId=1`;
      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
      // Fetch data from the URL
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });
      const Result = await response.json();
      console.log("order info", JSON.stringify(Result, null, 2));
      setData(Result);
    } catch (error) {
      // console.error("Fetch error:", error);
      // throw error;
    }
  };

  useEffect(() => {
    fetchOrderInfoData();
  }, []);

  // Initialize a variable to store the grand total
  let grandTotal = 0;

  // Map through the OrderItemList and calculate the grand total
  data?.OrderItemList?.forEach((item) => {
    grandTotal += item.TotalPrice;
  });

  return (

    <ScrollView>
      <View style={{ padding: 10, backgroundColor: "#e9ecef", elevation: 5 }}>
        <View style={styles.pageInfoOne}>
          <Text style={styles.text}>{data?.OrderBaicInfo?.OrderNo}</Text>
          <Text style={styles.text}>{data?.OrderBaicInfo?.OrderDate} </Text>
          <Text style={styles.text}>{data?.OrderBaicInfo?.DeliveryDate} </Text>
          <View style={styles.divider}></View>

          <Text style={styles.text}>{data?.OrderBaicInfo?.CustomerName}</Text>
          <Text style={styles.text}>
            {data?.OrderBaicInfo?.CustomerAddress}
          </Text>
        </View>

        <View
          style={{
            alignSelf: "center",
            width: "100%",
            marginVertical: 20,
            // padding: 10,
          }}
        >
          {data?.OrderItemList?.map((item, index) => (
            <View style={styles.container}>
              <View style={styles.column}>
                <Text style={styles.label} numberOfLines={2}>
                  {item.ProductName}
                </Text>
              </View>

              <View style={styles.column2}>
                <Text style={styles.label}>{item.Quantity}</Text>
              </View>

              <View style={styles.column2}>
                <Text style={styles.label}>{item.TotalPrice}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* grand total */}

        <View style={{ alignSelf: "flex-end" }}>
          <Text style={{ fontSize: 18, color: "black" }}>
            Total = {grandTotal}
          </Text>
        </View>

        <View style={{ width: 100, alignSelf: "center", marginVertical: 30 }}>
          <Button
            icon="arrow-left"
            mode="contained"
            onPress={() => navigation.goBack()}
            buttonColor="tomato"
          >
            Back
          </Button>
        </View>

      </View>
    </ScrollView>
    
  );
};

export default OrderInfo;

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#ffffff",
    // elevation: 5,
  },
  pageInfoOne: {
    marginTop: 10,
    // backgroundColor: "#c9cdd0",
    width: "100%",
    alignSelf: "center",
    borderRadius: 5,
    // elevation: 4,

    // padding:10
  },
  text: {
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 50,
  },
  divider: {
    borderBottomColor: "gray", 
    marginVertical: 8, 

    flex: 1, 
    height: 1, 
    width: "60%",
    backgroundColor: "gray", 
    alignSelf: "center",
  },
  column: {
    // flex: 1,
    width: "30%",
  },
  label: {
    fontSize: 16,
  },
});
