import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditItems from "../screens/EditItems";
import EditItem from "../screens/EditItem";

const Stack = createNativeStackNavigator();
function EditItemNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"EditItems"}
    >
      <Stack.Screen name="EditItems" component={EditItems} />
      <Stack.Screen name="EditItem" component={EditItem} />
    </Stack.Navigator>
  );
}

export default EditItemNavigator;
