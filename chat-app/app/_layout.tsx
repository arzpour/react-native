import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(main)/profileModal"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}

export default RootLayout;
