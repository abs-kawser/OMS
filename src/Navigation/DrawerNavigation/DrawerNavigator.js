import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
// import OrderCollection from "../../Screen/OrderCollection";
import CustomerList from "../../Screen/CustomerList";
import ProductList from "../../Screen/ProductList";
import OrderStatus from "../../Screen/OrderStatus";
import DrawerItems from "./DrawerItems";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import Darft from "../../Screen/Darft";
import ChangePassword from "../../Screen/ChangePassword";
import NoOrder from "../../Screen/NoOrder";
import CreateOrder from "../../Screen/CreateOrder";
import HomeScreen from "../../Screen/HomeScreen";
import ProfilePage from "../../Screen/ProfilePage";
// import { Image } from "react-native-paper/lib/typescript/components/Avatar/Avatar";
import Icon from "react-native-vector-icons/FontAwesome";

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
        component={HomeScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Image
              style={{ height: 30, width: 30, resizeMode: "contain" }}
              source={require("../../../assets/homes.png")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="user" size={38} color="#3498db" />

            // <Image
            //   style={{ height: 30, width: 30, resizeMode: "contain" }}
            //   source={require("../../../assets/homes.png")}
            // />
          ),
        }}
      />

      <Drawer.Screen
        name="Create Order"
        component={CreateOrder}
        options={{
          drawerLabel: "Create Order",
          drawerIcon: ({ focused, size }) => (
            <Image
              style={{ height: 30, width: 30, resizeMode: "contain" }}
              source={require("../../../assets/delivery-service.png")}
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
          title: "Draft",
          headerStyle: { backgroundColor: "#72ddf7" },
          headerTintColor: "white",
          headerTitleAlign: "center",

          drawerIcon: ({ focused, size }) => (
            <Image
              style={{ height: 30, width: 30, resizeMode: "contain" }}
              source={require("../../../assets/notes.png")}
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
            // <FontAwesome
            //   name="user-clock" // Change this to the actual icon name
            //   size={size}
            //   color={focused ? "black" : "gray"}
            // />

            <Image
              style={{ height: 30, width: 30, resizeMode: "contain" }}
              source={require("../../../assets/cargo.png")}
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
            // <FontAwesome
            //   name="address-book" // Change this to the actual icon name
            //   size={size}
            //   color={focused ? "black" : "gray"}
            // />
            <Image
              style={{ height: 30, width: 30, resizeMode: "contain" }}
              source={require("../../../assets/customer.png")}
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
            // <FontAwesome
            //   name="briefcase-medical" // Change this to the actual icon name
            //   size={size}
            //   color={focused ? "black" : "gray"}
            // />

            <Image
              style={{ height: 30, width: 30, resizeMode: "contain" }}
              source={require("../../../assets/list.png")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="No Order"
        component={NoOrder}
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: "No Order",
          headerStyle: { backgroundColor: "#72ddf7" },
          headerTintColor: "white",
          headerTitleAlign: "center",

          drawerIcon: ({ focused, size }) => (
            <Image
              style={{ height: 30, width: 30, resizeMode: "contain" }}
              source={require("../../../assets/no-order.png")}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Change Password"
        component={ChangePassword}
        options={{
          // drawerLabel: "Customer List",
          drawerIcon: ({ focused, size }) => (
            // <FontAwesome
            //   name="bell-slash" // Change this to the actual icon name
            //   size={size}
            //   color={focused ? "black" : "gray"}
            // />

            <Image
              style={{ height: 30, width: 30, resizeMode: "contain" }}
              source={require("../../../assets/password.png")}
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
