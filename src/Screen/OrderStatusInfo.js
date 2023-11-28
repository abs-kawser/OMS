import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "@rneui/themed";

const OrderStatusInfo = ({ route, navigation }) => {
  const { OrderStatus } = route.params; // Retrieve the order data passed as a parameter

  // Render the order data here

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Order No</Text>
          <Text style={styles.headerCell}>Order Date</Text>
          <Text style={styles.headerCell}>Delivery Date</Text>
          <Text style={styles.headerCell}>Status</Text>
       
           
        </View>
        {OrderStatus?.map((item) => (
          <View key={item.OrderNo} style={styles.row}>
            <Text style={styles.cell}>{item.OrderNo}</Text>
            <Text style={styles.cell}>
              {new Date(item.OrderDate).toLocaleDateString()}
            </Text>
            <Text style={styles.cell}>
              {new Date(item.DeliveryDate).toLocaleDateString()}
            </Text>
            <Text style={styles.cell}>{item.OrderStatus}</Text>
          </View>
        ))}
      </View>


      <View style={styles.btngrp}>
        <Button color="#0091ad">   
          <Text style={{ color: "white" }}>
            Total: {OrderStatus?.length} records
          </Text>
        </Button>
        <Button color="#0091ad" 
        onPress={() => navigation.goBack()}>
          
          <Text style={{ color: "white" }}> Back </Text></Button>
      </View>
      
    </ScrollView>
  );
};

export default OrderStatusInfo;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#ede7e3",
    padding: 5,
  },
  headerCell: {
    flex: 1,
    padding: 10,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#000",
    backgroundColor: "#bde0fe",
    marginTop: 10,
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    color: "black",
  },

  btngrp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    gap: 5,
  },
});



{
  /* <View styles= {styles.buttons}>
          <View style={styles.totalRow}>
            <Text style={styles.totalText1}>
              Total: {OrderStatus?.length} records
            </Text>
          </View>

          <View style={styles.backbutton}>
            <Text style={styles.backbtn}>Back</Text>
          </View>

        </View> */
}
