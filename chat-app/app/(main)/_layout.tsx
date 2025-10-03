import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";

export function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="conversation" options={{ headerShown: false }} />
      <Stack.Screen name="profileModal" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="newConversationModal"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
}

function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

export default RootLayout;
