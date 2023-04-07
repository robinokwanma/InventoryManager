import React from "react";
import { render } from '@testing-library/react-native';
import { describe, expect, it } from "@jest/globals";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "../src/components/AuthContext";
import AddItems from "../src/screens/AddItems";


// Snap Shot Test STARTS Here
describe("AddItems screen", () => {
  it("renders correctly", () => {
    const { toJSON } = render(
        <NavigationContainer>
          <AuthProvider>
            <AddItems />
          </AuthProvider>
        </NavigationContainer>
      )
      expect(toJSON()).toMatchSnapshot();
  });
});
// Snap Shot Test ENDS Here