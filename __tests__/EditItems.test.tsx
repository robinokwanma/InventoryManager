import React from "react";
import { render , fireEvent, waitFor} from "@testing-library/react-native";
import { describe, expect, it } from "@jest/globals";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from '../src/components/AuthContext';
import { useNavigation } from "@react-navigation/native";
import EditItems from "../src/screens/EditItems";
import { Alert } from "react-native";
import TestNavigator from "./TestNavigator";

// Snap Shot Test STARTS Here

//Mock  Navigation Module
jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

describe("EditItems screen", () => {

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
          <EditItems />
        </AuthProvider>
      </NavigationContainer>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
// Snap Shot Test ENDS Here



// Confirmation Pop-up on Delete Test STARTS Here

// Mock the Alert module
jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));
jest.mock("../src/components/ItemsContext");

it("shows confirmation pop-up when trying to delete an item", async () => {
  const { queryByTestId, findByTestId } = render(
    <NavigationContainer>
      <AuthProvider>
      <TestNavigator
          screenOptions={{ headerShown: true }}
          Component={EditItems}
          props={{
            items: [
              {
                id: 1,
                name: "Item 1",
                description: "Item 1 description totk",
                totalStock: 10,
                price: 100,
              },
              {
                id: 2,
                name: "Item 2",
                description: "Item 2  svssrdf erbvd",
                totalStock: 5,
                price: 50,
              },
            ],
            setItems: () => {},
          }}
        >
        </TestNavigator>
      </AuthProvider>
    </NavigationContainer>
  );

  // Assuming your delete button has testID="deleteButton"
  const deleteButton =  queryByTestId("delete-button");
  fireEvent.press(deleteButton);

  // Check if the alert is called
  expect(Alert.alert).toHaveBeenCalled();

  // Check the title and message of the alert prompt
  const [alertTitle, alertMessage, actions] = (Alert.alert as jest.Mock).mock.calls[0];

  expect(alertTitle).toBe("Confirm Deletion");
  expect(alertMessage).toBe("Are you sure you want to delete this item?");
  expect(actions.length).toBe(2);
  expect(actions[0].text).toBe("Cancel");
  expect(actions[1].text).toBe("Delete");
});
