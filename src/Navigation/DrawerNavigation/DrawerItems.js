import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useLogin } from "../../Context/LoginProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
 


const DrawerItems = (props) => {
  const navigation = useNavigation();

  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { login, userDetails } = isLoggedIn;

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await AsyncStorage.removeItem('userData');
            setIsLoggedIn((prevUserDetails) => ({
              ...prevUserDetails,
              login: false,
              userDetails: "",
            }));
            ToastAndroid.show("Logout Successfully", ToastAndroid.SHORT);
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: false }
    );
  };

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
              {userDetails.FullName}
            </Text>
            <Text style={[styles.grayText, styles.italicText]}>
              {userDetails.Email}
            </Text>
          </View>
        </View>

        {/* screens  */}
        <View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <DrawerItem
        icon={({ color, size }) => (
          <Icon name="logout" color={color} size={size} />
        )}
        label="Sign Out"
        onPress={handleLogout}
      />
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
