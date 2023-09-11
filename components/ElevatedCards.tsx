import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ElevatedCards() {
  return (
    <View>
      <Text style={styles.headingText}>Elevated Cards</Text>

      <ScrollView horizontal={true} style={styles.container}>
        <View style={[styles.card, styles.cardElevated]}>
          <Text>Tap</Text>
        </View>

        <View style={[styles.card, styles.cardElevated]}>
          <Text>me</Text>
        </View>

        <View style={[styles.card, styles.cardElevated]}>
          <Text>I</Text>
        </View>

        <View style={[styles.card, styles.cardElevated]}>
          <Text>scroll</Text>
        </View>

        <View style={[styles.card, styles.cardElevated]}>
          <Text>for</Text>
        </View>

        <View style={[styles.card, styles.cardlast]}>
          <Text>you😁</Text>
        </View>
      </ScrollView>

      {/* <View>
        <Image
          style={styles.imageStyle}
          source={{
            uri: "https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/374690606_1461354411108585_7737004923025582922_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeGpLWJuo6U36orZZrovtGp4ksZ-oMZyZAiSxn6gxnJkCBlWY8bT3T8VFLvIWuf6zkJFJTivvpCT95u2bLbxEjPm&_nc_ohc=Hw5bkYX00EwAX_cwHx_&_nc_ht=scontent.fdac14-1.fna&oh=00_AfDFwfWCEFGNaJSays9KMzm4duRi7Ud-Efqkdhc82upRlA&oe=65024230",
          }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 8,
  },
  container: {
    padding: 8,
  },

  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    margin: 8,
    gap: 2,
  },
  cardElevated: {
    backgroundColor: "#40E0D0",
    // its work like box shaw
    elevation: 4,

    shadowOffset: {
      width: 1,
      height: 1,
    },

    shadowColor: "#333",
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },

  cardlast: {
    backgroundColor: "#696969",
  },

  imageStyle: {
    height: 100,
    width: 100,
  },
});
