import ItemsList from "../screens/ItemsList";
import AddItems from "../screens/AddItems";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedIn } from "../components/AuthLogic";
import { useAuth } from "../components/AuthContext";

interface Item {
  id: number;
  name: string;
  price: number;
  totalStock: number;
  description: string;
}

const InventoryApp = () => {
  const [items, setItems] = useState<Item[]>([]);
  const { authenticated, setAuthenticated } = useAuth();

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("inventory");
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.log(error);
      }

      const loggedIn = await isLoggedIn();
      setAuthenticated(loggedIn);
    };

    loadItems();
  }, []);

  const handleAddItem = (newItem: Item) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <View>
      <AddItems
        items={items}
        setItems={setItems}
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        onAddItem={handleAddItem}
      />
      <ItemsList
        items={items}
        setItems={setItems}
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
    </View>
  );
};

export default InventoryApp;
