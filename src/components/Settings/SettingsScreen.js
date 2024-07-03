import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../../constants/colors.js";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBg,
  },
});

export default SettingsScreen;
