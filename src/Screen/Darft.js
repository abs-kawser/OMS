import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useDraft } from "../Context/DraftProvider";

const Draft = ({ navigation }) => {
  const { draftData, setDraftData } = useDraft();
  console.log("this is draft data", JSON.stringify(draftData, null, 2));

  // retrive data from asyncstorage
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const savedData = await AsyncStorage.getItem("customerInformation");
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            setDraftData(parsedData);
          }
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };
      fetchData();
    }, [])
  );

  // handle delete data
  const handleDeleteItem = async (selectedItem) => {
    try {
      // Filter out the selected item from draftData
      const updatedDraftData = draftData.filter(
        (item) => item !== selectedItem
      );
      // Update the AsyncStorage with the updated data
      await AsyncStorage.setItem(
        "customerInformation",
        JSON.stringify(updatedDraftData)
      );
      // Update the state to reflect the changes
      setDraftData(updatedDraftData);

      // Show a success message
      ToastAndroid.show("Delete Successful", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleItemPress = (selectedItem) => {
    navigation.navigate("Draft Request", {
      selectedItem,
      onDeleteItem: handleDeleteItem,
    });
    // Alert.alert(selectedItem.Note);
  };

  return (  
    
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerColumn60}>
              <Text style={styles.headerText}>Customer</Text>
            </View>
            <View style={styles.headerColumn}>
              <Text style={styles.headerText}>View</Text>
            </View>
            <View style={styles.headerColumn}>
              <Text style={styles.headerText}>Action</Text>
            </View>
          </View>
          {/* {draftData && Array.isArray(draftData) && draftData.map((item, index)  => ( */}
          {draftData &&
            draftData?.map((item, index) => (
              <View style={styles.row} key={index}>
                <View style={styles.column60}>
                  <Text style={styles.textColor}>{item.CustomerName}</Text>
                  <Text style={styles.textColor}>({item.CustomerId})</Text>
                  <Text style={styles.textColor}>{item.CustomerAddress}</Text>
                </View>
                <View style={styles.iconColumn}>
                  <TouchableOpacity
                    style={styles.iconCell}
                    onPress={() => handleItemPress(item)}
                  >
                    <Image
                      style={{ height: 25, width: 25, resizeMode: "contain" }}
                      source={require("../../assets/searchs.png")}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.iconColumn}>
                  <TouchableOpacity
                    style={styles.iconCell}
                    onPress={() => handleDeleteItem(item)}
                  >
                    {/* <FontAwesome name="trash" size={20} color="black" /> */}
                    <Image
                      style={{ height: 25, width: 25, resizeMode: "contain" }}
                      source={require("../../assets/delete.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    padding: 10,
  },
  headerText: {
    fontWeight: "700",
    fontFamily: "Roboto-bold",
  },
  headerColumn60: {
    width: "60%",
  },
  headerColumn: {
    flex: 2,
    // borderWidth:1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    padding: 15,
  },
  column60: {
    flex: 6,
  },
  iconColumn: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth:1,
  },
  textColor: {
    color: "black",
  },
});

export default Draft;
