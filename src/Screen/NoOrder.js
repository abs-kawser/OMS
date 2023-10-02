import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native"; // Import LottieView

export default function NoOrder() {
  return (
    <View >
      <View><Text> fdedf</Text></View>
    <LottieView
      source={require("../../Lottie/animation_ln8n5kbe.json")} // Replace with your animation file path
      autoPlay
      loop
      style={styles.loadingContainer}      
    />
  </View>






  )
}

const styles = StyleSheet.create({
  loadingContainer:{
    height:100,
    width:100
  }
   
})

