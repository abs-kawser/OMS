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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Darft from "../../Screen/Darft";

const Drawer = createDrawerNavigator();

//Drawer navigation total screen
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => 
      <DrawerItems {...props} />}
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#ffffff",
        headerStyle: {
          backgroundColor: "#72ddf7",
          elevation: 50,
          borderBottomWidth: 1,
          borderTopWidth: 0,
          borderBottomColor: "#e9ecef",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="home"
              size={size}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Create Order"
        component={CreateOrder}
        options={{
          drawerLabel: "Create Order",
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="plus-circle" // Change this to the actual icon name
              size={size}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Customer List"
        component={CustomerList}
        options={{
          drawerLabel: "Customer List",
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="address-book" // Change this to the actual icon name
              size={size}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Product List"
        component={ProductList}
        options={{
          // drawerLabel: "Customer List",
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="briefcase-medical" // Change this to the actual icon name
              size={size}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Order Status"
        component={OrderStatus}
        options={{
          // drawerLabel: "Customer List",
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="user-clock" // Change this to the actual icon name
              size={size}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="No Order"
        component={NoOrder}
        options={{
          // drawerLabel: "Customer List",
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="bell-slash" // Change this to the actual icon name
              size={size}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Darft Screen"
        component={Darft}
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: "Darft",
          headerStyle: { backgroundColor: "#72ddf7" },
          headerTintColor: "white",
          headerTitleAlign: "center",


          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="file-export" // Change this to the actual icon name
              size={size}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />

      {/* <Drawer.Screen name="Order Collection" component={OrderCollection} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
