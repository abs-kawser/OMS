import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateOrder() {
  const [client, setClient] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [note, setNote] = useState("");

  const navigation = useNavigation();

  const handleNextButtonPress = () => {
    // Add navigation to the registration page or any other action
    navigation.navigate("CreateOrderDetails");
  };

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Client Name:</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter client name"
          value={client}
          onChangeText={(text) => setClient(text)}
        />

        <Text style={styles.label}>Order Date:</Text>

      

        <TouchableOpacity style={styles.button} onPress={showDatepicker}>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
          <Text>Order Date: {date.toLocaleDateString()}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Delivery Date:</Text>

      

        <TouchableOpacity style={styles.button} onPress={showDatepicker}>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
          <Text>Delivery Date: {date.toLocaleDateString()}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Note:</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          placeholder="Enter notes"
          value={note}
          onChangeText={(text) => setNote(text)}
        />

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextButtonPress}
        >
          <Text style={styles.nextButtonText}>Nextt</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#0096c7",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },

  nextButton: {
    backgroundColor: "#0096c7", // Light blue background color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "flex-end", // Align button to the left
    marginTop: "auto",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white", // Text color
  },

  button: {
    borderWidth: 1,
    borderColor: "#0096c7",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
});
