import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

interface AuthFormProps {
  loginForm: LoginFormState;
  setLoginForm: (state: LoginFormState) => void;
  handleLogin: () => void;
}

export default function AuthForm({
  loginForm,
  setLoginForm,
  handleLogin,
}: AuthFormProps) {
  const renderLoginForm = () => (
    <View style={styles.loginContainer}>
      <Text style={styles.loginTitle}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
        value={loginForm.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setLoginForm({ ...loginForm, password: text })}
        value={loginForm.password}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );

  return renderLoginForm();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 80,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  loginContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  loginTitle: {
    fontSize: 24,
    marginBottom: 20,
    alignSelf: "center",
  },
});
