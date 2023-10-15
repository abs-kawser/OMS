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
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

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
      <Drawer.Screen name="Home" component={Home} 
           options={{
            drawerIcon: ({ focused, size }) => (
              <FontAwesome name="home" size={size} color={focused ? 'black' : 'gray'} />
            ),
          }}
      
      />

      <Drawer.Screen name="Create Order" component={CreateOrder} 
             options={{
              drawerLabel: 'Create Order',
              drawerIcon: ({ focused, size }) => (
                <FontAwesome
                  name="plus-square" // Change this to the actual icon name
                  size={size}
                  color={focused ? 'blue' : 'black'}
                />
              ),
            }}
       />
      <Drawer.Screen name="Customer List" component={CustomerList} />
      <Drawer.Screen name="Product List" component={ProductList} />
      <Drawer.Screen name="Order Status" component={OrderStatus} />
      <Drawer.Screen name="No Order" component={NoOrder} />
      {/* <Drawer.Screen name="Order Collection" component={OrderCollection} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
