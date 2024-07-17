import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import colors from "../constants/colors.js";

const HeaderButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <Text style={style.text}>Clear Chat</Text>
      <MaterialCommunityIcons
        name="trash-can-outline"
        size={28}
        color="white"
      />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: "22%",
    height: "85%",
    marginHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#1E3A8A",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    fontFamily: "regular",
    fontSize: 14,
    color: "#FFFFFF",
  },
});

export default HeaderButton;
