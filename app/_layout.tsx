import { Stack } from "expo-router";
import { TicketProvider } from "./contexts/TicketContext";

export default function RootLayout() {
  return (
    <TicketProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="search" />
        <Stack.Screen name="club-card" />
        <Stack.Screen name="ticket" />
        <Stack.Screen name="exclusive-booking" />
        <Stack.Screen
          name="[category]"
          options={{
            title: "Category Clubs",
            headerShown: false,
          }}
        />
      </Stack>
    </TicketProvider>
  );
}
