import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (email: string, password: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email) && password.length > 0) {
    await AsyncStorage.setItem("user", JSON.stringify({ email, password }));
    return true;
  } else {
    throw new Error(
      "Error during login, try again. pleasue use a valid email and make sure your password has at least 4 characters"
    );
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem("user");
};

export const isLoggedIn = async (): Promise<boolean> => {
  const user = await AsyncStorage.getItem("user");
  return user !== null;
};
