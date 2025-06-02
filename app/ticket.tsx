import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type VenueType = "playboy" | "privee" | "clubBw";

interface CountState {
  playboy: number;
  privee: number;
  clubBw: number;
}

export default function App() {
  const [menCount, setMenCount] = useState<CountState>({
    playboy: 0,
    privee: 0,
    clubBw: 0,
  });

  const [womenCount, setWomenCount] = useState<CountState>({
    playboy: 0,
    privee: 0,
    clubBw: 0,
  });

  const updateCount = (
    venue: VenueType,
    gender: "men" | "women",
    increment: boolean
  ) => {
    if (gender === "men") {
      setMenCount((prev) => ({
        ...prev,
        [venue]: Math.max(0, prev[venue] + (increment ? 1 : -1)),
      }));
    } else {
      setWomenCount((prev) => ({
        ...prev,
        [venue]: Math.max(0, prev[venue] + (increment ? 1 : -1)),
      }));
    }
  };

  const clearAllTickets = () => {
    setMenCount({
      playboy: 0,
      privee: 0,
      clubBw: 0,
    });
    setWomenCount({
      playboy: 0,
      privee: 0,
      clubBw: 0,
    });
  };

  const removeVenue = (venue: VenueType) => {
    setMenCount((prev) => ({ ...prev, [venue]: 0 }));
    setWomenCount((prev) => ({ ...prev, [venue]: 0 }));
  };

  const VenueCard = ({
    venue,
    imageUrl,
    name,
  }: {
    venue: VenueType;
    imageUrl: string;
    name: string;
  }) => {
    // Only show venue card if it has any count
    const hasCount = menCount[venue] > 0 || womenCount[venue] > 0;

    if (!hasCount) return null;

    return (
      <View style={styles.venueCard}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.venueImage}
          resizeMode="cover"
        />
        <View style={styles.venueDetails}>
          <View style={styles.venueHeader}>
            <Text style={styles.venueName}>{name}</Text>
            <TouchableOpacity onPress={() => removeVenue(venue)}>
              <Feather name="x" size={12} color="black" />
            </TouchableOpacity>
          </View>

          {menCount[venue] > 0 && (
            <View style={styles.counterContainer}>
              <Text style={styles.counterLabel}>Men</Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => updateCount(venue, "men", false)}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{menCount[venue]}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => updateCount(venue, "men", true)}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {womenCount[venue] > 0 && (
            <View style={styles.counterContainer}>
              <Text style={styles.counterLabel}>Women</Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => updateCount(venue, "women", false)}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterValue}>{womenCount[venue]}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => updateCount(venue, "women", true)}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const totalCount =
    Object.values(menCount).reduce((a, b) => a + b, 0) +
    Object.values(womenCount).reduce((a, b) => a + b, 0);

  const hasAnyTickets = totalCount > 0;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <View style={styles.header}>
          <TouchableOpacity>
            <Feather name="home" size={31} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.titleContainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>insyd</Text>
              <View style={styles.logoDot} />
            </View>
            <Text style={styles.titleText}>Ticket</Text>
          </View>

          {!hasAnyTickets && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No tickets added yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Add venues to your ticket to get started
              </Text>
            </View>
          )}

          <VenueCard
            venue="playboy"
            name="Playboy"
            imageUrl="https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg"
          />

          <VenueCard
            venue="privee"
            name="Privee"
            imageUrl="https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg"
          />

          <VenueCard
            venue="clubBw"
            name="Club BW"
            imageUrl="https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg"
          />

          {hasAnyTickets && (
            <>
              <View style={styles.totalPrice}>
                <Text style={styles.totalPriceLabel}>Total Price:</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.currencySymbol}>₹</Text>
                  <Text style={styles.priceValue}>{totalCount * 1000}</Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={clearAllTickets}
                >
                  <Text style={styles.clearButtonText}>Clear Ticket</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.payButton}>
                  <Text style={styles.payButtonText}>Pay Now!</Text>
                  <Text style={styles.payButtonSubtext}>
                    Tap to view offers
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
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  logoContainer: {
    position: "relative",
    marginRight: 8,
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#424242",
  },
  logoDot: {
    position: "absolute",
    top: 2,
    left: 0,
    width: 9,
    height: 9,
    backgroundColor: "#e81174",
    borderRadius: 4.62,
  },
  titleText: {
    fontSize: 35,
    fontWeight: "500",
    color: "black",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  venueCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  venueImage: {
    width: 157,
    height: 127,
    borderRadius: 16,
  },
  venueDetails: {
    flex: 1,
    marginLeft: 20,
  },
  venueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  venueName: {
    fontSize: 17.4,
    fontWeight: "400",
  },
  counterContainer: {
    marginTop: 12,
  },
  counterLabel: {
    fontSize: 7.6,
    fontWeight: "500",
    color: "#3e3e3e",
    marginBottom: 4,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    height: 29,
    borderWidth: 0.84,
    borderColor: "#d9d9d9",
    borderRadius: 6.72,
    backgroundColor: "white",
  },
  counterButton: {
    width: 40,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    fontSize: 16,
    color: "#e91174",
    fontWeight: "500",
  },
  counterValue: {
    flex: 1,
    textAlign: "center",
    fontSize: 12.6,
    fontWeight: "500",
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  totalPriceLabel: {
    fontSize: 14.2,
    fontWeight: "500",
    color: "#3e3e3e",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  currencySymbol: {
    fontSize: 14.2,
    fontWeight: "500",
  },
  priceValue: {
    fontSize: 23.6,
    fontWeight: "500",
    marginLeft: 4,
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
    fontSize: 13,
    fontWeight: "600",
  },
  payButton: {
    flex: 1,
    height: 52,
    borderRadius: 18.91,
    backgroundColor: "#e91174",
    justifyContent: "center",
    alignItems: "center",
  },
  payButtonText: {
    color: "white",
    fontSize: 14.2,
    fontWeight: "600",
  },
  payButtonSubtext: {
    color: "white",
    fontSize: 9.5,
    fontWeight: "500",
  },
});
