import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="index" />
      <Stack.Screen name = "login"/>
      <Stack.Screen name = "signup"/>
      <Stack.Screen name = "welcome"/>
      <Stack.Screen name = "profile"/>
      <Stack.Screen name="create" />
    </Stack>
  );
}
