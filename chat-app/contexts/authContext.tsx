import {
  AuthContextProps,
  DecodedTokenProps,
  IChildren,
  UserProps,
} from "@/types/types";
import { useRouter } from "expo-router";
import React, { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { login } from "@/services/authService";

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateToken: async () => {},
});

export const AuthProvider = ({ children }: IChildren) => {
  const [token, setToken] = React.useState<string>();
  const [user, setUser] = React.useState<UserProps>();
  const router = useRouter();

  const updateToken = async (token: string) => {
    if (token) {
      setToken(token);
      await AsyncStorage.setItem("token", token);
      // decode token (user)
      const decoded = jwtDecode<DecodedTokenProps>(token);
      console.log("decoded token: ", decoded);
      setUser(decoded.user);
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    console.log("🚀 ~ signIn ~ response:", response);
    await updateToken(response.token);
    router.replace("/(main)/home");
  };
};
