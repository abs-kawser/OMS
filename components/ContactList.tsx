import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ContactList() {
  const users = [
    {
      uid: "1",
      name: "John Doe",
      address: "123 Main Street",
      status: "Active",
      imageUrl: "https://i.postimg.cc/RVLSjZKF/photo-1575936123452-b67c3203c357-ixlib-rb-4-0.jpg"
    },
    {
      uid: "2",
      name: "Jane Smith",
      address: "456 Elm Avenue",
      status: "Inactive",
      imageUrl:"https://i.postimg.cc/RVLSjZKF/photo-1575936123452-b67c3203c357-ixlib-rb-4-0.jpg"
    },
    {
      uid: "3",
      name: "Bob Johnson",
      address: "789 Oak Lane",
      status: "Active",
      imageUrl: "https://i.postimg.cc/RVLSjZKF/photo-1575936123452-b67c3203c357-ixlib-rb-4-0.jpg"
    },
    // Add more objects as needed
  ];
  //console.log(users);
  

  return (
    <View
    style={styles.ConatctContainer}
    >
      <ScrollView style={styles.container} scrollEnabled={false}>
        <Text style={styles.headingText}>
          Contact List Those are Iteration data
        </Text>
        {users.map(({ uid, name, address, status, imageUrl }) => (
          <View key={uid} style={styles.userCard}>
            <Image
              source={{
                uri: imageUrl,
              }}
              style={styles.userImage}
            />

            <View>
              <Text style={styles.userName}>{name}</Text>
              <Text style={styles.userStatus}>{name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    ConatctContainer: {
      marginBottom: 20,
    },

  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 16,
    marginTop: 20,
  },
  container: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Shadow for a card-like effect
  },
  userCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 64,
    height: 64,
    borderRadius: 32, // To make the image circular
    marginRight: 16,
    margin:10
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userStatus: {
    color: "green", // You can use different colors based on status
  },
});
