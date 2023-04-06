import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tabs from "./src/navigation/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/components/AuthContext";
import { ItemsProvider } from "./src/components/ItemsContext";

export default function App() {
  return (
    <ItemsProvider>
      <PaperProvider>
        <AuthProvider>
          <NavigationContainer>
            <Tabs />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </ItemsProvider>
  );
}
