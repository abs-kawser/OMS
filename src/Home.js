import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import ElevatedCards from "../components/ElevatedCards";
import FanseCards from "../components/FanseCards";
import { Button } from "react-native-paper";

export default function Home() {
  return (
    <View>
      {/* <Header/> */}
      <FanseCards />

      <ElevatedCards />
    </View>
  );
}

const styles = StyleSheet.create({});
