import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import colors from "../../constants/colors.js";
import loadingGif from "../../../assets/images/loadingGif.gif";

const BubbleChat = ({ text, role }) => {
  const textStyle = { ...styles.text };

  if (role === "assistant") {
    textStyle.color = "black";
  }

  return (
    <View
      style={[
        styles.bubbleWrapper,
        {
          justifyContent: role === "assistant" ? "flex-start" : "flex-end",
        },
      ]}
    >
      <View
        style={[
          styles.container,
          role === "assistant"
            ? styles.assistantBubble
            : role === "loading"
            ? styles.loading
            : styles.userContainer,
        ]}
      >
        {text && <Text style={textStyle}>{text}</Text>}
        {role === "loading" && (
          <Image source={loadingGif} style={styles.loadingGif} />
        )}
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
  loading: {
    width: "25%",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  loadingGif: {
    height: 100,
    width: 120,
  },
});

export default BubbleChat;
