import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const Draft = ({navigation}) => {
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

  const handleItemPress = selectedItem => {
    // Navigate to the target component with the selected item's data

    // console.log('leave request', selectedItem);

    navigation.navigate('Draft Request', {
      selectedItem,
      onDeleteItem: handleDeleteItem,
    });

    // Alert.alert(selectedItem.Note);
  };

  return (
    <ScrollView>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.header}>Customer</Text>
          <Text style={styles.header}>View</Text>
          <Text style={styles.header}>Action</Text>
        </View>
        {draftData.map((item, index) => (
          <View style={styles.row} key={item.id}>
            <View style={styles.cell}>
              <Text style={styles.textColor}>{item.CustomerName}</Text>
              <Text style={styles.textColor}>({item.CustomerId})</Text>
              <Text style={styles.textColor}>{item.CustomerAddress}</Text>
            </View>

            <TouchableOpacity style={styles.iconCell} onPress={() => handleItemPress(item)}>
              <Icon name="search" size={22} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconCell}
              onPress={() => handleDeleteItem(item)}
            >
              <Icon name="trash" size={25} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    // backgroundColor: "#fff",
    // borderWidth: 1,
    borderColor: "#0077b6",
    flexDirection: "column",
    padding: 15,
  },
  row: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    borderBottomColor: "#0077b6",
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  header: {
    flex: 1,
    padding: 8,
    textAlign: "center",
    // fontWeight: "bold",
    backgroundColor: "#0077b6",
    color: "#fff",
  },
  cell: {
    flex: 1,
    padding: 1,

    // width:"60%"
  },
  iconCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textColor: {
    color: "black",
  },
});

export default Draft;
