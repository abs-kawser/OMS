import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../../Screen/Home";
import CreateOrder from "../../Screen/CreateOrder";
// import OrderCollection from "../../Screen/OrderCollection";
import CustomerList from "../../Screen/CustomerList";
import ProductList from "../../Screen/ProductList";
import NoOrder from "../../Screen/NoOrder";
import OrderStatus from "../../Screen/OrderStatus";
import DrawerItems from "./DrawerItems";

const Drawer = createDrawerNavigator();

//Drawer navigation total screen
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerItems {...props} />}
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#ffffff",
        headerStyle: {
          backgroundColor: "#468faf",
          elevation: 50,
          borderBottomWidth: 1,
          borderTopWidth: 0,
          borderBottomColor: "#e9ecef",
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} />

      <Drawer.Screen name="Create Order" component={CreateOrder} />
      {/* <Drawer.Screen name="Order Collection" component={OrderCollection} /> */}
      <Drawer.Screen name="Customer List" component={CustomerList} />
      <Drawer.Screen name="Product List" component={ProductList} />
      <Drawer.Screen name="Order Status" component={OrderStatus} />
      <Drawer.Screen name="No Order" component={NoOrder} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
