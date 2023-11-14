import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function FlatCards() {
  const navigation = useNavigation();

  return (
    <View>
      {/* <Text style={styles.headingText}>FlatCards</Text> */}
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.card, styles.cardOne]}
          onPress={() => navigation.navigate("Create Order")}
        >
          <Image
            style={{ height: 25, width: 25, resizeMode: "contain" }}
            source={require("../assets/delivery-service.png")}
          />
          <Text>Create Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.cardOne]}
         onPress={() => navigation.navigate("Customer List")}

        >
          
          <Image
            style={{ height: 25, width: 25, resizeMode: "contain" }}
            source={require("../assets/customer.png")}
          />
          <Text>Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.cardOne]}
          onPress={() => navigation.navigate("Product List")}
        >
          <Image
            style={{ height: 25, width: 25, resizeMode: "contain" }}
            source={require("../assets/list.png")}
          />
          <Text>Product</Text>
        </TouchableOpacity>
      </View>
      {/* ========================== */}
      <View style={styles.container}>
        <TouchableOpacity style={[styles.card, styles.cardOne]}
          onPress={() => navigation.navigate("Order Status")}
        >
          <Image
            style={{ height: 25, width: 25, resizeMode: "contain" }}
            source={require("../assets/order-refund.png")}
          />
          <Text>Order Status</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.cardOne]}
          onPress={() => navigation.navigate("Change Password")}
        >
          <Image
            style={{ height: 25, width: 25, resizeMode: "contain" }}
            source={require("../assets/password.png")}
          />
          <Text>Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.cardOne]}
          onPress={() => navigation.navigate("Darft Screen")}
        >
          <Image
            style={{ height: 25, width: 25, resizeMode: "contain" }}
            source={require("../assets/draft.png")}
          />
          <Text>Draft</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 8,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 8,
    elevation: 5,
  },

  card: {
    //useing flex and  work top to bottom
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: 100,
    borderRadius: 15,
    margin: 8,
  },

  cardOne: {
    backgroundColor: "#a9def9",
  },

});
