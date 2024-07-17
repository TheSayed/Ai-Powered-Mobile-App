// App.js
import "react-native-gesture-handler";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Fontisto, Entypo } from "@expo/vector-icons";
import ChatScreen from "./src/components/Chat/ChatScreen";
import ImageScreen from "./src/components/Image/ImageScreen";
import SettingsScreen from "./src/components/Settings/SettingsScreen";

SplashScreen.preventAutoHideAsync();

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
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          ...options,
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="player-settings" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Image"
        component={ImageScreen}
        options={{
          ...options,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="image-inverted" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    boldItalic: require("./assets/fonts/Poppins-BlackItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
