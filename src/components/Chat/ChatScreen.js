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
import {
  addUserMessage,
  clearConversation,
  getConversation,
} from "../../../utilis/conversationHistory.js";
import { makeChatRequest } from "../../../utilis/gbtUtilis.js";
import HeaderButton from "../HeaderButton.jsx";

import BubbleChat from "../BubbleChat.js";
import InputContainer from "../InputContainer.jsx";
import GetStartedComponent from "../GetStartedComponent.jsx";

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
        {!loading && conversation.length === 0 && <GetStartedComponent />}
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

      <InputContainer
        value={messageText}
        onChangeText={setMessageText}
        onPress={sendMessage}
        placeholder={"Type a message..."}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBg,
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
});

export default ChatScreen;
