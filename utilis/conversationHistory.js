let conversation = [];

export const getConversation = () => conversation;

export const initConversation = () => {
  addSystemMessage("you are a pirate named sadam bin huissain");
};

export const addUserMessage = (messageText) => {
  if (messageText) {
    conversation.push({
      role: "user",
      content: messageText,
    });
  }
  console.log("User message added:", conversation); // Add this line for debugging
};

export const addAssistantMessage = (messageText) => {
  if (messageText) {
    conversation.push({
      role: "assistant",
      content: messageText,
    });
  }
};

export const addSystemMessage = (messageText) => {
  if (messageText) {
    conversation.push({
      role: "system",
      content: messageText,
    });
  }
};

export const clearConversation = () => {
  conversation = [];
  initConversation();
};

// Initialize conversation at the start
initConversation();
