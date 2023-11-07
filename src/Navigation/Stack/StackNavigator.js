import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "../DrawerNavigation/DrawerNavigator";

import { NavigationContainer } from "@react-navigation/native";
import CreateOrderDetails from "../../Screen/CreateOrderDetails";
import OrderInfo from "../../Screen/OrderInfo";
import OrderStatusInfo from "../../Screen/OrderStatusInfo";
import Darft from "../../Screen/Darft";
import DraftRequest from "../../Screen/DraftRequest";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

      {/* take screen  */}

      <Stack.Screen
        name="Order Details"
        component={CreateOrderDetails}
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: "Order  Details",
          headerStyle: { backgroundColor: "#8338ec" },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerBackTitle: "Go Back",
        }}
      />

      <Stack.Screen
        name="Order Info"
        component={OrderInfo}
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: "Order   Information",
          headerStyle: { backgroundColor: "#8338ec" },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      {/* screen for order Status */}

      <Stack.Screen
        name="Order Status Info"
        component={OrderStatusInfo}
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: "Order Status",
          headerStyle: { backgroundColor: "#8338ec" },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="Draft Request"
        component={DraftRequest}
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: "Draft Request",
          headerStyle: { backgroundColor: "#8338ec" },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

//first take that drawer navigation component then  do one page to another page
