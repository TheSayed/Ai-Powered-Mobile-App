import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Image,
} from "react-native";
import colors from "../../constants/colors.js";
import {
  addUserMessage,
  clearConversation,
  getConversation,
} from "../../../utilis/conversationHistory.js";
import {
  makeChatRequest,
  makeImageRequest,
} from "../../../utilis/gbtUtilis.js";
import HeaderButton from "../HeaderButton.jsx";
import BubbleChat from "../BubbleChat.js";
import InputContainer from "../InputContainer.jsx";
import GetStartedComponent from "../GetStartedComponent.jsx";

const ImageScreen = ({ navigation }) => {
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

  const text = messageText;
  const tempConversation = [...conversation, text];
  const sendMessage = useCallback(async () => {
    if (messageText === "") return;
    try {
      setMessageText("");
      setLoading(true);
      addUserMessage(messageText);
      setConversation(tempConversation);
      const responseData = await makeImageRequest(text);
      const imagesUrl = responseData.map((image) => image.url);
      tempConversation.push(...imagesUrl);
      setConversation(tempConversation);
    } catch (error) {
      console.log(error);
      setMessageText(text);
    } finally {
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
            if (conversationItem.startsWith("https://")) {
              return (
                <Image
                  width={256}
                  height={256}
                  source={{ uri: conversationItem }}
                />
              );
            }
            return <BubbleChat text={conversationItem} role={"user"} />;
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
        placeholder={"Type a message to generate an image..."}
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

export default ImageScreen;
