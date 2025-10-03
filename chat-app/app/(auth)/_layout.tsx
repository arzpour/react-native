import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";

export function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
    </Stack>
  );
}

function RootLayout() {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
}

export default RootLayout;
