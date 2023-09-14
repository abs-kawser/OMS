import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Home from "../../Home";
import CreateOrder from "../../CreateOrder";
import OrderCollection from "../../OrderCollection";
import NoOrder from "../../NoOrder";
import CustomerList from "../../CustomerList";
import ProductList from "../../ProductList";
import DrawerItems from "./DrawerItems";
import LoginPage from "../../LoginPage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OrderStatus from "../../OrderStatus";

const Drawer = createDrawerNavigator();

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

      {/* <Drawer.Screen name="Login " component={LoginPage} /> */}
      <Drawer.Screen name="Create Order" component={CreateOrder} />
      <Drawer.Screen name="Order Collection" component={OrderCollection} />
      <Drawer.Screen name="Customer List" component={CustomerList} />
      <Drawer.Screen name="Product List" component={ProductList} />
      <Drawer.Screen name="Order Status" component={OrderStatus} />
      <Drawer.Screen name="No Order" component={NoOrder} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
