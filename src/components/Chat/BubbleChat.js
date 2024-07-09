import { View, Text, StyleSheet } from "react-native";
import React from "react";
import colors from "../../constants/colors.js";

const BubbleChat = ({ text, role }) => {
  const textStyle = { ...styles.text };

  if (role === "assistant") {
    textStyle.color = "black";
  }
  return (
    <View
      style={[
        styles.bubbleWrapper,
        { justifyContent: role === "assistant" ? "flex-start" : "flex-end" },
      ]}
    >
      <View
        style={[
          styles.container,
          role === "assistant" ? styles.assistantBubble : styles.userContainer,
        ]}
      >
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleWrapper: {
    marginBottom: 10,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  container: {
    borderRadius: 35,
    paddingVertical: 10,
    paddingHorizontal: 12,
    maxWidth: "90%",
  },
  assistantBubble: {
    backgroundColor: colors.secondary,
  },
  userContainer: {
    backgroundColor: colors.primary,
  },
  text: {
    color: "white",
    fontFamily: "regular", // Adjust as needed for visibility
  },
});

export default BubbleChat;
