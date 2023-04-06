import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../components/AuthContext";
import AuthForm from "../components/AuthForm";
import { login, logout, isLoggedIn } from "../components/AuthLogic";
import { launchImageLibrary } from "react-native-image-picker";

interface Item {
  id: number;
  name: string;
  price: number;
  totalStock: number;
  description: string;
  imageUri: string;
}

interface AddItemsProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  onAddItem: (newItem: Item) => void;
}

interface LoginFormState {
  email: string;
  password: string;
}

const AddItems = ({}: AddItemsProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState("");

  const [totalStock, setTotalStock] = useState("");
  const [description, setDescription] = useState("");
  const { authenticated, setAuthenticated } = useAuth();
  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const navigation = useNavigation();

  const addItem = async () => {
    if (!name) {
      alert("Name is required.");
      return;
    }

    if (!price) {
      alert("Price is required.");
      return;
    }

    if (!totalStock) {
      alert("Total Stock is required.");
      return;
    }

    if (!description) {
      alert("Description is required.");
      return;
    }

    const descriptionWords = description.trim().split(/\s+/);
    if (descriptionWords.length < 4) {
      alert("Description must contain at least 4 words.");
      return;
    }

    const existingItem = items.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (existingItem) {
      alert("Item with the same name already exists.");
      return;
    }

    const newItem: Item = {
      id: Date.now(),
      name,
      price: Number(price),
      totalStock: Number(totalStock),
      description,
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setName("");
    setPrice("");
    setTotalStock("");
    setDescription("");

    try {
      await AsyncStorage.setItem("inventory", JSON.stringify(updatedItems));
      navigation.navigate("Inventory");
      alert("New item added");
    } catch (error) {
      console.log(error);
    }
  };
  const addNewItems = () => (
    <>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Item name"
        onChangeText={setName}
        value={name}
      />
      <Text>Price:</Text>
      <TextInput
        style={styles.input}
        placeholder="Price"
        onChangeText={setPrice}
        value={price}
        keyboardType="numeric"
      />
      <Text>Total Stock:</Text>
      <TextInput
        style={styles.input}
        placeholder="Total Stock"
        onChangeText={setTotalStock}
        value={totalStock}
        keyboardType="numeric"
      />
      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={setDescription}
        value={description}
        numberOfLines={5}
        textAlignVertical="top"
      />
      <Button title="Add Item" onPress={addItem} />
    </>
  );

  const handleLogin = async () => {
    if (loginForm.email && loginForm.password) {
      try {
        await login(loginForm.email, loginForm.password);
        setAuthenticated(true);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please enter email and password");
    }
  };

  const handleLogout = async () => {
    await logout();
    setAuthenticated(false);
    try {
      await AsyncStorage.removeItem("authenticated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
      {authenticated ? (
        <View style={styles.container}>{addNewItems()}</View>
      ) : (
        <AuthForm
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          handleLogin={handleLogin}
        />
      )}
    </View>
      </TouchableWithoutFeedback>
  );
};

export default AddItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
