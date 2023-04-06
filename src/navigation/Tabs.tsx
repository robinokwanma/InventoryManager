import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ItemsList from "../screens/ItemsList";
import AddItems from "../screens/AddItems";
import EditItemNavigator from "./EditItemNavigator";
import LogoutButton from "../components/LogoutButton";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Tabs() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          flex: 1.1 / 10,
          justifyContent: "center",
          alignItems: "center",
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 0,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          ...styles.Shadow,
        },
      })}
    >
      <Tab.Screen
        name="Inventory"
        component={ItemsList}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/dashboard.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#225cca" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#225cca" : "#748c94",
                  fontSize: 12,
                }}
              >
                Inventory
              </Text>
            </View>
          ),
          headerRight: () => <LogoutButton />,
          headerStyle: {
            backgroundColor: "#205295",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="AddItems"
        component={AddItems}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/add.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#225cca" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#225cca" : "#748c94",
                  fontSize: 12,
                }}
              >
                Add Items
              </Text>
            </View>
          ),
          headerRight: () => <LogoutButton />,
          headerStyle: {
            backgroundColor: "#205295",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="Edit/Update"
        component={EditItemNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/edit.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#225cca" : "#748c94",
                }}
              />
              <Text
                style={{
                  color: focused ? "#225cca" : "#748c94",
                  fontSize: 12,
                }}
              >
                Edit Items
              </Text>
            </View>
          ),
          headerRight: () => <LogoutButton />,
          headerStyle: {
            backgroundColor: "#205295",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  Shadow: {
    shadowColor: "#7F5Df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
