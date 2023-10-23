import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

const Draft = ({ navigation }) => {
  const [draftData, setDraftData] = useState([]);

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

      // Optionally, you can show an alert or confirmation message
      // Alert.alert('Item deleted successfully');
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // handle press

  const handleItemPress = (selectedItem) => {
    // Navigate to the target component with the selected item's data
    // console.log('leave request', selectedItem);

    navigation.navigate("Draft Request", {
      selectedItem,
      onDeleteItem: handleDeleteItem,
    });

    // Alert.alert(selectedItem.Note);
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerColumn60}>
              <Text style={styles.headerText}>Customer Info</Text>
            </View>
            <View style={styles.headerColumn}>
              <Text style={styles.headerText}>View</Text>
            </View>
            <View style={styles.headerColumn}>
              <Text style={styles.headerText}>Action</Text>
            </View>
          </View>
          
          {draftData.map((item, index) => (
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
                  {/* <FontAwesome name="eye" size={24} color="blue" /> */}
                  <Icon name="search" size={18} color="black" />
                </TouchableOpacity>
              </View>

              <View style={styles.iconColumn}>
                <TouchableOpacity
                  style={styles.iconCell}
                  onPress={() => handleDeleteItem(item)}
                >
                  <FontAwesome name="trash" size={18} color="black" />
                  {/* <Icon name="trash" size={25} color="black" /> */}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
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
    fontWeight: "bold",
  },
  headerColumn60: {
    width: "60%",
  },
  headerColumn: {
    flex: 2,
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
  },
  textColor: {
    color: "black",
  },
});

export default Draft;
