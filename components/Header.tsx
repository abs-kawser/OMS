import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>OMS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#457b9d', // You can change the background color to your preference
    height: 60, // You can adjust the height as needed
    justifyContent: 'center',
   
  },
  headerText: {
    color: 'white', // You can adjust the text color as needed
    fontSize: 24, // You can adjust the font size as needed
    fontWeight: 'bold', // You can adjust the font weight as needed
  },
});

export default Header;
