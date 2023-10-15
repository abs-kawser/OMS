import React from "react";
import { View, Text, StyleSheet, FlatList,ScrollView } from "react-native";

const OrderStatusInfo = ({ route }) => {
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
            {/* <Text style={styles.cell}>{item.OrderDate}</Text>
        <Text style={styles.cell}>{item.DeliveryDate}</Text> */}
            <Text style={styles.cell}>{item.OrderStatus}</Text>
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalText1}>
            Total: {OrderStatus?.length} records
          </Text>
        </View>

        <View style={styles.backbutton }>
          <Text style={styles.backbtn}>
              Back
           </Text>
        </View>
      </View>
    </ScrollView>

    // <View style={styles.container}>
    //    <View style={styles.orderItemContainer}>
    //     {OrderStatus.map((item) => (
    //       <View key={item.OrderNo} style={styles.orderItem}>
    //         <View style={styles.innerBox}>
    //           <Text style={styles.label}> Order No</Text>
    //           <Text style={styles.value}>{item.OrderNo}</Text>

    //           <Text style={styles.label}>Order Date</Text>
    //           <Text style={styles.value}>{item.OrderDate}</Text>

    //           <Text style={styles.label}>Delivery Date</Text>
    //           <Text style={styles.value}>{item.DeliveryDate}</Text>

    //           <Text style={styles.label}>Status</Text>
    //           <Text style={styles.value}>{item.OrderStatus}</Text>
    //         </View>
    //       </View>
    //     ))}
    //   </View>
    // </View>
  );
};

export default OrderStatusInfo;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  // container: {
  //   flex: 1,
  //   // borderWidth: 1,
  //   // borderColor: '#000',
  //   //margin: 10,
  // },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#f9c74f",
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
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#333",
    // width:"50%"
  },
  totalText1: {
    flex: 1,
    padding: 10,
    color: "#fff",
    textAlign: "center",
    width:"40%"
  },

  totalText2: {
    flex: 1,
    padding: 10,
    color: "#fff",
    textAlign: "center",
    width:"40%"

  },
  backbutton:{
     
  }

  // container: {
  //   flex: 1,
  //   padding: 5,
  //   marginTop:10
  // },
  // title: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   marginBottom: 16,
  // },
  // orderItemContainer: {
  //   width: "100%",
  //   height: "30%",
  //   // padding: 5,
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  // },
  // orderItem: {
  //   width: "50%",
  //   height: "100%",
  //   padding: 5,

  // },

  // innerBox: {
  //   flex: 1,
  //   backgroundColor: "#90e0ef",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   padding:5,
  //   borderBottomEndRadius:20,
  //   borderTopLeftRadius:30,

  // },
  // gap: {
  //   width: "5%",
  // },
  // label: {
  //   color: "black",
  //   // fontWeight: "bold",
  // },
  // value: {
  //   marginTop: 4,
  //   color: "black",
  // },
});
