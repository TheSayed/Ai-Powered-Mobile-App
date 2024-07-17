import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../constants/colors.js";
import { Entypo } from "@expo/vector-icons";

const GetStartedComponent = () => {
  return (
    <View style={styles.getStartedMessage}>
      <Entypo name="light-bulb" size={48} color={colors.lightGrey} />
      <Text style={styles.getStartedText}>Type a message to get started</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  getStartedMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  getStartedText: {
    fontSize: 20,
    fontFamily: "regular",
    color: colors.lightGrey,
  },
});
export default GetStartedComponent;
