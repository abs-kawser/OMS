import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const OrderStatusInfo = ({ route }) => {
  const { OrderStatus } = route.params; // Retrieve the order data passed as a parameter

  // Render the order data here

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Status Order Screen</Text> */}
      {/* <FlatList
        data={OrderStatus} // Pass your order data array here
        keyExtractor={(item) => item.OrderNo.toString()} // Assuming "OrderNo" is a unique identifier
        renderItem={({ item }) => (
          <View style={styles.orderItemContainer}>
            <View style={styles.orderItem}>
              <View style={styles.innerBox}>
                <Text style={styles.label}>Order Number:</Text>
                <Text style={styles.value}>{item.OrderNo}</Text>

                <Text style={styles.label}>Order Date:</Text>
                <Text style={styles.value}>{item.OrderDate}</Text>

                <Text style={styles.label}>Delivery Date:</Text>
                <Text style={styles.value}>{item.DeliveryDate}</Text>

                <Text style={styles.label}>Order Status:</Text>
                <Text style={styles.value}>{item.OrderStatus}</Text>
              </View>
            </View>

            <View style={styles.gap} />
          </View>
        )}
      /> */}

      <View style={styles.orderItemContainer}>
        {OrderStatus.map((item) => (
          <View key={item.OrderNo} style={styles.orderItem}>
            <View style={styles.innerBox}>
              <Text style={styles.label}> Order Number </Text>
              <Text style={styles.value}>{item.OrderNo}</Text>

              <Text style={styles.label}>Order Date</Text>
              <Text style={styles.value}>{item.OrderDate}</Text>

              <Text style={styles.label}>Delivery Date</Text>
              <Text style={styles.value}>{item.DeliveryDate}</Text>

              <Text style={styles.label}>Order Status</Text>
              <Text style={styles.value}>{item.OrderStatus}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>

    //     <View style={styles.container}>
    //     <Text style={styles.title}>Status Order Screen</Text>
    //     <FlatList
    //       data={OrderStatus} // Pass your order data array here
    //       keyExtractor={(item) => item.OrderNo.toString()} // Assuming "OrderNo" is a unique identifier
    //       renderItem={({ item }) => (
    //         <View style={styles.orderItem}>

    //           <Text style={styles.label}>Order Number:</Text>
    //           <Text style={styles.value}>{item.OrderNo}</Text>

    //           <Text style={styles.label}>Order Date:</Text>
    //           <Text style={styles.value}>{item.OrderDate}</Text>

    //           <Text style={styles.label}>Delivery Date:</Text>
    //           <Text style={styles.value}>{item.DeliveryDate}</Text>

    //           <Text style={styles.label}>Order Status:</Text>
    //           <Text style={styles.value}>{item.OrderStatus}</Text>
    //           </View>

    //       )}
    //     />
    //   </View>
  );
};

export default OrderStatusInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginTop:10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  orderItemContainer: {
    width: "100%",
    height: "30%",
    // padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  orderItem: {
    width: "50%",
    height: "100%",
    padding: 5,

  },

  innerBox: {
    flex: 1,
    backgroundColor: "#90e0ef",
    alignItems: "center",
    justifyContent: "center",
    padding:5,
    borderBottomEndRadius:20,
    borderTopLeftRadius:30,

  },
  gap: {
    width: "5%",
  },
  label: {
    color: "black",
    // fontWeight: "bold",
  },
  value: {
    marginTop: 4,
    color: "black",
  },

  //   container: {
  //     flex: 1,
  //     padding: 16,
  //   },
  //   title: {
  //     fontSize: 18,
  //     fontWeight: 'bold',
  //     marginBottom: 10,
  //   },
  //   orderItem: {
  //     marginBottom: 20,

  //     // flexDirection:"row",

  //   },
  //   label: {
  //     fontSize: 16,
  //     fontWeight: 'bold',
  //   },
  //   value: {
  //     fontSize: 16,
  //     marginBottom: 5,
  //   },
  //   card:{
  //     width: '30%', // Three cards in a row
  //     padding: 16,
  //     borderWidth: 1,
  //     borderColor: '#ccc',
  //     marginBottom: 16,
  //     borderBottomEndRadius:15
  //   }
});
