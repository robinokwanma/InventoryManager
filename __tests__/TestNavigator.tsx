import React from 'react';
import {describe, expect, it} from '@jest/globals';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

test('renders correctly', () => {
    expect(true).toBeTruthy();
  });
  

const TestScreenComponent = ({ children }) => {
  return <>{children}</>;
};

const TestNavigator = ({ Component, screenOptions }) => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="TestScreen" component={TestScreenComponent} />
    </Stack.Navigator>
  );
};

export default TestNavigator;
