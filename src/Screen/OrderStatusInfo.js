// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { Button } from "@rneui/themed";

// const OrderStatusInfo = ({ route, navigation }) => {
//   const { OrderStatus } = route.params; // Retrieve the order data passed as a parameter

//   // Render the order data here

//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.headerRow}>
//           <Text style={styles.headerCell}>Order No</Text>
//           <Text style={styles.headerCell}>Order Date</Text>
//           <Text style={styles.headerCell}>Delivery Date</Text>
//           <Text style={styles.headerCell}>Status</Text>
//         </View>

//         <ScrollView style={styles.scrollContainer}>
//           {OrderStatus?.map((item) => (
//             <View key={item.OrderNo} style={styles.row}>
//               <Text style={styles.cell}>{item.OrderNo}</Text>
//               <Text style={styles.cell}>
//                 {new Date(item.OrderDate).toLocaleDateString()}
//               </Text>
//               <Text style={styles.cell}>
//                 {new Date(item.DeliveryDate).toLocaleDateString()}
//               </Text>
//               <Text style={styles.cell}>{item.OrderStatus}</Text>
//             </View>
//           ))}
//         </ScrollView>
//       </View>

//       <View style={styles.btngrp}>
//         <Button color="#0091ad">
//           <Text style={{ color: "white" }}>
//             Total: {OrderStatus?.length} records
//           </Text>
//         </Button>
//         <Button color="#0091ad" onPress={() => navigation.goBack()}>
//           <Text style={{ color: "white" }}> Back </Text>
//         </Button>
//       </View>
//     </>
//   );
// };

// export default OrderStatusInfo;

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flex: 1,
//   },
//   headerRow: {
//     flexDirection: "row",
//     backgroundColor: "#ede7e3",
//     padding: 5,
//   },
//   headerCell: {
//     flex: 1,
//     padding: 10,
//     color: "black",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   row: {
//     flexDirection: "row",
//     borderBottomWidth: 0.5,
//     borderColor: "#000",
//     backgroundColor: "#bde0fe",
//     marginTop: 10,
//   },
//   cell: {
//     flex: 1,
//     padding: 10,
//     textAlign: "center",
//     color: "black",
//   },

//   btngrp: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     marginTop: 20,
//     paddingHorizontal: 10,
//     gap: 5,
//   },
// });

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
import moment from "moment";

const OrderStatusInfo = ({ route, navigation }) => {
  const { OrderStatus } = route.params; // Retrieve the order data passed as a parameter

  // Render the order data here

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Order No</Text>
          <Text style={styles.headerCell}>Order Date</Text>
          <Text style={styles.headerCell}>Delivery Date</Text>
          <Text style={styles.headerCell}>Status</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {OrderStatus?.map((item) => (
          <View key={item.OrderNo} style={styles.row}>
            <Text style={styles.cell}>{item.OrderNo}</Text>
            <Text style={styles.cell}>
              {new Date(item.OrderDate).toLocaleDateString()}
            </Text>
            <Text style={styles.cell}>
              {/* {new Date(item.DeliveryDate).toLocaleDateString()} */}
              {moment(item.DeliveryDate).format('DD/MM/YYYY')}

            </Text>
            <Text style={styles.cell}>{item.OrderStatus}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.btngrp}>
        <Button color="#0091ad">
          <Text style={{ color: "white" }}>
            Total: {OrderStatus?.length} records
          </Text>
        </Button>
        <Button color="#0091ad" onPress={() => navigation.goBack()}>
          <Text style={{ color: "white" }}> Back </Text>
        </Button>
      </View>
    </View>
  );
};

export default OrderStatusInfo;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff", // Optional background color for the button container
    // position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
