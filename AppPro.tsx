import React from "react";

import { StyleSheet, Text, View, useColorScheme } from "react-native";

function AppPro(): JSX.Element {
  const isDarkTheme = useColorScheme() === "dark";

  return (
    <View style={Styles.conatainer}>
      <Text style={isDarkTheme ? Styles.whiteText : Styles.darkText}>
        hello world
      </Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  whiteText: {
    color: "#FFFFFF",
  },
  darkText: {
    color: "#000000",
  },
});

export default AppPro;
