import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "../components/Chat/ChatScreen.js";
import ImageScreen from "../components/Image/ImageScreen.js";
import SettingsScreen from "../components/Settings/SettingsScreen.js";
import { Fontisto, Entypo } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const options = {
    headerTitleStyle: {
      fontFamily: "regular",
    },
    tabBarLabelStyle: {
      fontFamily: "regular",
    },
  };
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          ...options,
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="chat" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          ...options,
          tabBarIcon: ({ color, size }) => {
            return (
              <Fontisto name="player-settings" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Image"
        component={ImageScreen}
        options={{
          ...options,
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="image-inverted" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
