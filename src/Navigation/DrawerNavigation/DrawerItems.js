import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

const DrawerItems = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* custom drawer header */}
        <View
          style={{
            borderBottomWidth: 1,
            // borderColor: "#e9ecef",
            backgroundColor: "#822faf",
            marginTop: -4,
            padding: 10,
          }}
        >
          <Image
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
            style={{
              width: 100,
              height: 70,
              // alignSelf: "center",
              margin: 10,
              resizeMode: "contain",
            }}
          />
          <View style={styles.container}>
            <Text style={[styles.boldWhiteText, styles.italicText]}>
              Hello, this is user name{" "}
            </Text>
            <Text style={[styles.grayText, styles.italicText]}>
              This is email field{" "}
            </Text>
          </View>
        </View>

        {/* screens  */}
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerItems;

const styles = StyleSheet.create({
  boldWhiteText: {
    fontWeight: "bold",
    color: "#7fdeff",
    fontSize: 18,
  },
  grayText: {
    color: "#caff8a",
    fontSize: 18,
  },
  italicText: {
    fontStyle: "italic",
    fontSize: 18,
  },
});
