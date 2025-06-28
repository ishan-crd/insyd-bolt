import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useTicket } from "./TicketContext";
import VenueCard from "./components/VanueCard";

export default function TicketScreen() {
  const router = useRouter();
  const { tickets, removeTicket, clearAllTickets, updateTicketCount } =
    useTicket();

  const totalAmount = tickets.reduce(
    (sum, ticket) => sum + ticket.totalPrice,
    0
  );
  const totalPeople = tickets.reduce(
    (sum, ticket) => sum + ticket.men + ticket.women,
    0
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />

        <View style={styles.headerWrapper}>
          <Text style={styles.logoText}><Text style={styles.logoPink}>in</Text>syd</Text>
          <TouchableOpacity>
            <MaterialIcons name="local-activity" size={30} color="#ffff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {tickets.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No tickets added yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Add venues to your ticket to get started
              </Text>
              <TouchableOpacity
                style={styles.browseButton}
                onPress={() => router.push("/home")}
              >
                <Text style={styles.browseButtonText}>Browse Venues</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {tickets.map((ticket) => (
                <VenueCard
                  key={ticket.venue}
                  ticket={ticket}
                  onRemove={removeTicket}
                  onUpdateCount={updateTicketCount}
                />
              ))}

              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total People:</Text>
                  <Text style={styles.summaryValue}>{totalPeople}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total Venues:</Text>
                  <Text style={styles.summaryValue}>{tickets.length}</Text>
                </View>
              </View>

              <View style={styles.totalPrice}>
                <Text style={styles.totalPriceLabel}>Total Amount:</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.currencySymbol}>₹</Text>
                  <Text style={styles.priceValue}>{totalAmount}</Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={clearAllTickets}
                >
                  <Text style={styles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.payButton}>
                  <Text style={styles.payButtonText}>Pay Now!</Text>
                  <Text style={styles.payButtonSubtext}>
                    Complete your booking
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "black",
  },
  logoText: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "NeuePlakExtendedBlack",
  },
  logoPink: {
    color: "#EC4899",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginBottom: 30,
  },
  browseButton: {
    backgroundColor: "#e91174",
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  browseButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  summaryCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 8,
    marginBottom: 16,
    borderTopWidth: 2,
    borderTopColor: "#e91174",
  },
  totalPriceLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: "500",
    color: "#e91174",
  },
  priceValue: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 4,
    color: "#e91174",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  clearButton: {
    flex: 1,
    height: 52,
    borderRadius: 18.91,
    borderWidth: 1.18,
    borderColor: "#e91174",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  clearButtonText: {
    color: "#e91174",
    fontSize: 14,
    fontWeight: "600",
  },
  payButton: {
    flex: 1.5,
    height: 52,
    borderRadius: 18.91,
    backgroundColor: "#e91174",
    justifyContent: "center",
    alignItems: "center",
  },
  payButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  payButtonSubtext: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
});
