import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../components/AuthContext";
import { login, logout, isLoggedIn } from "../components/AuthLogic";

export interface Item {
  id: number;
  name: string;
  price: number;
  totalStock: number;
  description: string;
  imageUri: string;
}

interface ItemsListProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
interface RenderItemProps {
  item: Item;
}

interface LoginFormState {
  email: string;
  password: string;
}

const ItemsList = () => {
  const [loginForm, setLoginForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [items, setItems] = useState<Item[]>([]);
  const { authenticated, setAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        const loggedIn = await isLoggedIn();
        setAuthenticated(loggedIn);
      };

      loadItems();

      // Returning a cleanup function to avoid memory leaks when the component is unmounted
      return () => {};
    }, [])
  );
  const renderInventoryManagement = () => (
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
        placeholder="Search items..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems} // Use filteredItems instead of items
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noMatches}>No matches</Text>
      )}
      {/* <Button title="Logout" onPress={handleLogout} /> */}
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

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Image
        style={styles.image}
        source={{ uri: "https://via.placeholder.com/150" }}
      />
      <Text>
        <Text style={{ fontWeight: "bold" }}>Description:</Text> {"\n"}
        {item.description}
      </Text>
      <View style={styles.priceStockContainer}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Total Stock:</Text>{" "}
          {item.totalStock}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Price:</Text> ${item.price}
        </Text>
      </View>
    </View>
  );

  return (
    
    <View style={styles.container}>
      {authenticated ? (
        <View style={styles.container}>{renderInventoryManagement()}</View>
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

export default ItemsList;

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
  searchBar: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 5,
    borderRadius: 5,
  },
  noMatches: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
