let conversation = [];

export const getConversation = () => conversation;

export const initConversation = () => {
  addSystemMessage(
    "The GPT is designed to serve as an expert in human nutrition and fitness, providing personalized diet plans and workout routines tailored to individual user needs. It should offer comprehensive guidance on various diet plans, including but not limited to, ketogenic, paleo, vegan, Mediterranean, and intermittent fasting. Additionally, it should be proficient in creating customized gym and home workout routines, catering to different fitness goals such as weight loss, muscle gain, endurance, and overall health."
  );
};

export const addUserMessage = (messageText) => {
  if (messageText) {
    conversation.push({
      role: "user",
      content: messageText,
    });
  }
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
