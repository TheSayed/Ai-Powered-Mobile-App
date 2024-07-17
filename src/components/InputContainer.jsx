import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import colors from "../constants/colors.js";

const InputContainer = ({ value, onChangeText, onPress, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textBox}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.sendButton} onPress={onPress}>
        <Feather name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    flex: 1,
    fontFamily: "regular",
    letterSpacing: 0.5,
  },
});

export default InputContainer;
