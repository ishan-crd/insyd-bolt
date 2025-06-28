import { Stack } from "expo-router";
import { TicketProvider } from "./TicketContext";

export default function RootLayout() {
  return (
    <TicketProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="club-card" />
        <Stack.Screen name="ticket" />
      </Stack>
    </TicketProvider>
  );
}
