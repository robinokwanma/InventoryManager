import React from "react";
import { Alert, Image, Text, TouchableOpacity } from "react-native";
import { useAuth } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogoutButton = () => {
  const { setAuthenticated } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            // Call logout logic
            setAuthenticated(false);
            try {
              await AsyncStorage.removeItem("authenticated");
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={{ marginRight: 30 }} onPress={handleLogout}>
      <Image
        source={require("../../assets/logout.png")}
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          marginRight: 5,
          tintColor: "red",
    
        }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>Logout</Text>
    </TouchableOpacity>
    // <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={handleLogout}>
    //   <Image source={require("../../assets/logout.png")} style={{ width: 20, height: 20, marginRight: 5 }} />
    //   <Text>Logout</Text>
    // </TouchableOpacity>
  );
};

export default LogoutButton;
