import React from "react";
import { render } from "@testing-library/react-native";
import { describe, expect, it } from "@jest/globals";
import { NavigationContainer } from "@react-navigation/native";
import EditItem from "../src/screens/EditItems";
import { AuthProvider } from "../src/components/AuthContext";
import { useNavigation } from "@react-navigation/native";


// Snap Shot Test STARTS Here
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));


describe("EditItem screen", () => {
  beforeEach(() => {
    // Provide a dummy implementation of setOptions for the test
    (useNavigation as jest.Mock).mockReturnValue({
      setOptions: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { toJSON } = render(
      <NavigationContainer>
        <AuthProvider>
          <EditItem />
        </AuthProvider>
      </NavigationContainer>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
// Snap Shot Test ENDS Here