import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import ElevatedCards from "../components/ElevatedCards";
import FanseCards from "../components/FanseCards";
import { Button } from 'react-native-paper';

export default function Home() {
  return (
    <View>
      {/* <Header/> */}
      <FanseCards />

      <ElevatedCards />

      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Press me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
