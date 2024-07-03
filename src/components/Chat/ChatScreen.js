import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import colors from "../../constants/colors.js";
import { Feather } from "@expo/vector-icons";

const ChatScreen = () => {
  const [messages, setMessages] = useState("");
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <View style={styles.messagesContainer}></View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textBox} placeholder="Type a message...." />
        <TouchableOpacity style={styles.sendButton}>
          <Feather name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBg,
  },
  inputContainer: {
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
  },
  messagesContainer: {
    flex: 1,
  },
});

export default ChatScreen;
