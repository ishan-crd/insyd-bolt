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
import VenueCard from "./components/VenueCard";

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
        <StatusBar barStyle="light-content" backgroundColor="#000" />

        <View style={styles.headerWrapper}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.logoText}>
            <Text style={styles.logoPink}>in</Text>syd
          </Text>
          <TouchableOpacity>
            <MaterialIcons name="local-activity" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {tickets.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons
                name="confirmation-number"
                size={80}
                color="#333"
              />
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
              <Text style={styles.sectionTitle}>Your Tickets</Text>

              {tickets.map((ticket) => (
                <VenueCard
                  key={ticket.venue}
                  ticket={ticket}
                  onRemove={removeTicket}
                  onUpdateCount={updateTicketCount}
                />
              ))}

              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Booking Summary</Text>
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
                  <MaterialIcons name="clear-all" size={18} color="#EC4899" />
                  <Text style={styles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.payButton}>
                  <MaterialIcons name="payment" size={20} color="#fff" />
                  <View style={styles.payButtonContent}>
                    <Text style={styles.payButtonText}>Pay Now!</Text>
                    <Text style={styles.payButtonSubtext}>
                      Complete your booking
                    </Text>
                  </View>
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
    backgroundColor: "#000",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#000",
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
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 8,
    marginTop: 20,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: "Montserrat-Light",
    color: "#999",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 20,
  },
  browseButton: {
    backgroundColor: "#EC4899",
    borderRadius: 999,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  browseButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Montserrat-Medium",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 20,
    marginTop: 10,
  },
  summaryCard: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#222",
  },
  summaryTitle: {
    fontSize: 16,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: "Montserrat-Light",
    color: "#ccc",
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 8,
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#EC4899",
  },
  totalPriceLabel: {
    fontSize: 18,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
    color: "#EC4899",
  },
  priceValue: {
    fontSize: 28,
    fontFamily: "NeuePlakExtendedBlack",
    marginLeft: 4,
    color: "#EC4899",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  clearButton: {
    flex: 1,
    height: 52,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#EC4899",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    gap: 8,
  },
  clearButtonText: {
    color: "#EC4899",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Montserrat-Medium",
  },
  payButton: {
    flex: 1.5,
    height: 52,
    borderRadius: 999,
    backgroundColor: "#EC4899",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  payButtonContent: {
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Montserrat-Medium",
  },
  payButtonSubtext: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "Montserrat-Light",
    marginTop: 2,
  },
});
