

import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

const OrderInfo = ({ route }) => {
  const data = route.params?.data;
  return (
    <View>
      <ScrollView>
        <View style={styles.pageInfoOne}>
          <Text style={styles.text}>{data.OrderBaicInfo.OrderNo}</Text>
          <Text style={styles.text}>{data.OrderBaicInfo.OrderDate} </Text>
          <Text style={styles.text}>{data.OrderBaicInfo.DeliveryDate} </Text>
          <View style={styles.divider}></View>
          <Text style={styles.text}>{data.OrderBaicInfo.CustomerName}</Text>
          <Text style={styles.text}>{data.OrderBaicInfo.CustomerAddress}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderInfo;

const styles = StyleSheet.create({
  pageInfoOne: {
    marginTop: 30,
    backgroundColor:"#c9cdd0",
    width:"80%",
    alignSelf:"center",
    borderRadius:5,
    elevation: 4,

  },
  text: {
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: 50,
  },
  divider: {
    // borderBottomWidth: "10%", // Set the border width to create a line.
    borderBottomColor: "gray", // Set the color of the line to gray.
    marginVertical: 8, // Add vertical margin to separate the divider from text.

    flex: 1, // Take up available space.
    height: 1, // Set the height of the divider.
    width: "60%",
    backgroundColor: "gray", // Set the color of the line to gray.
    // marginLeft: "20%",
    alignSelf:"center"
  },
});
