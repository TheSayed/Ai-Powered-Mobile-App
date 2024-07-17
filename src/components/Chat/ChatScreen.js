import React, { useCallback, useEffect, useRef, useState } from "react";
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
  clearConversation,
  getConversation,
  initConversation,
} from "../../../utilis/conversationHistory.js";
import { makeChatRequest } from "../../../utilis/gbtUtilis.js";
import BubbleChat from "./BubbleChat.js";
import HeaderButton from "../HeaderButton.jsx";
import { Entypo } from "@expo/vector-icons";

const ChatScreen = ({ navigation }) => {
  const [messageText, setMessageText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const flatList = useRef();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          onPress={() => {
            setConversation([]);
            clearConversation();
          }}
        >
          Clear Chat
        </HeaderButton>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    clearConversation();
    setConversation([]);
  }, []);

  const sendMessage = useCallback(async () => {
    if (messageText === "") return;
    try {
      setLoading(true);
      addUserMessage(messageText);
      const updatedConversation = getConversation();
      setConversation(updatedConversation);

      await makeChatRequest(updatedConversation); // Pass the conversation to the request function
    } catch (error) {
      console.log(error);
    } finally {
      setConversation(getConversation());
      setLoading(false);
    }
  }, [messageText]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <View style={styles.messagesContainer}>
        {!loading && conversation.length === 0 && (
          <View style={styles.getStartedMessage}>
            <Entypo name="light-bulb" size={48} color={colors.lightGrey} />
            <Text style={styles.getStartedText}>
              Type a message to get started
            </Text>
          </View>
        )}
        <FlatList
          ref={(ref) => (flatList.current = ref)}
          onLayout={flatList.current?.scrollToEnd({ animated: true })}
          onContentSizeChange={flatList.current?.scrollToEnd({
            animated: true,
          })}
          style={styles.flatlist}
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
        {loading && (
          <View style={styles.loadingContainer}>
            <BubbleChat role="loading" />
          </View>
        )}
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
  flatlist: {
    padding: 10,
  },
  loadingContainer: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    width: "100%",
  },
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

export default ChatScreen;
