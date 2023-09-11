import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export default function FanseCards() {
  const handleButtonPress = () => {
    // Handle button press action here
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headingText}>Trandeing Place</Text>
      {/* rapping like div   */}
      <View style={[styles.card, styles.cardElevated]}>
        <Image
          source={{
            uri: "https://static.toiimg.com/img/101335068/Master.jpg",
          }}
          //styling image inside image tag

          style={styles.cardImage}
        />

        <View style={styles.CardBody}>
          <Text style={styles.CardTitle}>white Flower</Text>

          <Text style={styles.CardLabel}>Pink city</Text>
          <Text style={styles.CardDescription}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit,
            ipsum!
          </Text>

          <Text style={styles.cardFooter}>
            This is the card footer 12 min aways{" "}
          </Text>

          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
              <Text style={styles.buttonText}>Press Me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer:{
         marginBottom:18
    },


  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 8,
  },

  //its style like card
  card: {
    width: 350,
    height: 380,
    borderRadius: 6,
    marginVertical: 12,
    marginHorizontal: 16,
  },

  cardElevated: {
    backgroundColor: "#FFFFFF",
    elevation: 3,

    shadowOffset: {
      width: 1,
      height: 1,
    },
  },

  cardImage: {
    height: 180,
    marginBottom: 8,
    borderTopRightRadius: 26,
    borderBottomLeftRadius: 6,
  },

  CardBody: {
    flex: 1,
    flexGrow: 1,
    fontWeight: "bold",
    marginBottom: 6,
  },

  CardTitle: {
    fontSize: 22,
    color: " ",
  },

  CardLabel: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 6,
  },

  CardDescription: {
    fontSize: 12,
    marginBottom: 12,
    marginTop: 6,
    flexShrink: 1,
    color: "#23C4ED",
  },

  cardFooter: {
    color: "#000000",
  },

  //btn part

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue", // Button background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white", // Text color
    fontSize: 12,
  },
});
