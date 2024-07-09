import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Text,
} from "react-native";
import colors from "../../constants/colors.js";
import { Feather } from "@expo/vector-icons";
import {
  addUserMessage,
  getConversation,
  initConversation,
} from "../../../utilis/conversationHistory.js";
import { checkUsage, makeChatRequest } from "../../../utilis/gbtUtilis.js";
import BubbleChat from "./BubbleChat.js";

const ChatScreen = () => {
  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    initConversation();
    setConversation([]);
  }, []);

  const sendMessage = useCallback(async () => {
    if (messageText === "") return;
    try {
      addUserMessage(messageText);
      setMessageText("");
      setConversation(getConversation());

      await makeChatRequest();
    } catch (error) {
      console.log(error);
    } finally {
      setConversation(getConversation());
    }
  }, [messageText]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <View style={styles.messagesContainer}>
        <FlatList
          data={conversation}
          renderItem={(itemData) => {
            const conversationItem = itemData.item;
            if (conversationItem.role === "system") return null;
            return (
              <BubbleChat
                text={conversationItem.content}
                role={conversationItem.role}
              />
            );
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textBox}
          placeholder="Type a message...."
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
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
    fontFamily: "regular",
    letterSpacing: 0.5,
  },
  messagesContainer: {
    flex: 1,
    padding: 12,
  },
});

export default ChatScreen;
