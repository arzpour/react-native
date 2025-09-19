import {
  AuthContextProps,
  DecodedTokenProps,
  IChildren,
  UserProps,
} from "@/types/types";
import { useRouter } from "expo-router";
import React, { createContext, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { login, register } from "@/services/authService";

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateToken: async () => {},
});

export const AuthProvider = ({ children }: IChildren) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<UserProps | null>(null);
  const router = useRouter();

  React.useEffect(() => {
    loadToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = await jwtDecode<DecodedTokenProps>(storedToken);

        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          // token has expired, navigate to welcome page
          await AsyncStorage.removeItem("token");
          goToWelcomePage();
          return;
        }

        // user is logged in
        setToken(storedToken);
        setUser(decoded.user);
        goToHomePage();
      } catch (error) {
        goToWelcomePage();
        console.log("🚀 ~ loadToken ~ error:", error);
      }
    } else {
      goToWelcomePage();
    }
  };

  const goToWelcomePage = () => {
    setTimeout(() => {
      router.replace("/(auth)/welcome");
    }, 1500);
  };

  const goToHomePage = () => {
    setTimeout(() => {
      router.replace("/(main)/home");
    }, 1500);
  };

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

  const signUp = async (
    email: string,
    password: string,
    name: string,
    avatar?: string
  ) => {
    const response = await register(email, password, name, avatar);
    console.log("🚀 ~ signIn ~ response:", response);
    await updateToken(response.token);
    router.replace("/(main)/home");
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    router.replace("/(auth)/welcome");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, signIn, signUp, signOut, updateToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
