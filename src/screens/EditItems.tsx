import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../components/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { login, logout, isLoggedIn } from "../components/AuthLogic";
import AuthForm from "../components/AuthForm";
import { Item } from "./ItemsList";
import LogoutButton from "../components/LogoutButton";
import { useItems } from "../components/ItemsContext";

interface EditItemsProps {
  isTest?: boolean;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditItems = () => {
  const { items, setItems } = useItems();
  const { authenticated, setAuthenticated } = useAuth();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, items]);

  useFocusEffect(
    React.useCallback(() => {
      const loadItems = async () => {
        const storedItems = await AsyncStorage.getItem("inventory");
        try {
          if (storedItems) {
            setItems(JSON.parse(storedItems));
          }
        } catch (error) {
          console.log(error);
        }
      };

      loadItems();

      // Returning a cleanup function to avoid memory leaks when the component is unmounted
      return () => {};
    }, [])
  );

  const editItem = (id: number) => {
    navigation.navigate("EditItem", { itemId: id, items: items });
  };

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

  const deleteItem = async (id: number) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          const filteredItems = items.filter((item) => item.id !== id);
          setItems(filteredItems);

          try {
            await AsyncStorage.setItem(
              "inventory",
              JSON.stringify(filteredItems)
            );
          } catch (error) {
            console.log(error);
          }
        },
        style: "destructive",
      },
    ]);
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item} >
      <Text style={styles.title}>{item.name}</Text>
      <Image
        style={styles.image}
        source={{ uri: "https://via.placeholder.com/150" }}
      />
      <Text>Price: ${item.id}</Text>
      <Text>{item.description}</Text>
      <View style={styles.priceStockContainer}>
        <Text>Total Stock: {item.totalStock}</Text>
        <Text>Price: ${item.price}</Text>
        
      </View>
      <View style={styles.buttonContainer} >
        <Button title="Edit" onPress={() => editItem(item.id)} />
        <Button title="Delete" onPress={() => deleteItem(item.id)} testID="delete-button"/>
      </View>
    </View>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {authenticated ? (
        <>
          <Text style={{ marginBottom: 5 }}>
            <Text>Search </Text>

            <Image
              source={require("../../assets/search.png")}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                marginRight: 10,
              }}
            />
          </Text>
          <TextInput
            style={styles.searchBar}
            placeholder="Search n Edit..."
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          {filteredItems.length > 0 ? (
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => (item.id ?? 0).toString()}
              renderItem={renderItem}
            />
          ) : (
            <Text style={styles.noMatches}>No matches</Text>
          )}
        </>
      ) : (
        <AuthForm
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          handleLogin={handleLogin}
        />
      )}
    </View>
  );
};

export default EditItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginBottom: 20,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    marginTop: 10,
  },
  priceStockContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  searchBar: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  noMatches: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
