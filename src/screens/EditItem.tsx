// EditItem.tsx
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useItems } from "../components/ItemsContext";

interface Item {
  id: number;
  name: string;
  price: number;
  totalStock: number;
  description: string;
}

interface EditItemRouteProp {
  itemId: number;
}

interface EditItemProps {
  route: {
    params: {
      itemId: number;
    };
  };
}

const EditItem = ({ route }: EditItemProps) => {
  const itemId = route.params.itemId;
  const { items, setItems } = useItems();
  const item = items.find((i) => i.id === itemId);
  const setItem = route.params.setItem;
  const [name, setName] = useState(item ? item.name : "");
  const [price, setPrice] = useState(item ? item.price.toString() : "");
  const [totalStock, setTotalStock] = useState(item ? item.totalStock.toString() : "");
  const [description, setDescription] = useState(item ? item.description : "");
  const navigation = useNavigation();

  const saveItem = async () => {
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

    // Check for existing item with the same name, excluding the current item
    const existingItem = items.find(
      (item) =>
        item.name.toLowerCase() === name.toLowerCase() && item.id !== itemId
    );
    if (existingItem) {
      alert("Item with the same name already exists.");
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            name,
            price: Number(price),
            totalStock: Number(totalStock),
            description,
          }
        : item
    );

    setItems(updatedItems);
    try {
      await AsyncStorage.setItem("inventory", JSON.stringify(updatedItems));
      navigation.navigate("EditItems");
      alert("Item updated");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (item) {
      setName(item.name);
      setPrice(item.price.toString());
      setTotalStock(item.totalStock.toString());
      setDescription(item.description);
    }
  }, [item]);

  useEffect(() => {
    const loadItem = async () => {
      const storedItems = await AsyncStorage.getItem("inventory");
      if (storedItems) {
        const items: Item[] = JSON.parse(storedItems);
        const foundItem = items.find((i) => i.id === route.params.itemId);
        setItem(foundItem || null);
      }
    };

    loadItem();
  }, [route.params.itemId]);

  // Add logic to update the item and save it to AsyncStorage

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Item not found</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
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
      <Button title="Update Item" onPress={saveItem} />
    </View>
    </TouchableWithoutFeedback>
  );
};

export default EditItem;

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
});
