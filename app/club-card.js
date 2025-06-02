import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { useTicket } from "./TicketContext";

const { width, height } = Dimensions.get("window");

const BookingRoute = () => <View style={{ flex: 1 }} />;
const DrinksRoute = () => <View style={{ flex: 1 }} />;
const MenuRoute = () => <View style={{ flex: 1 }} />;

export default function ClubCard() {
  const router = useRouter();
  const { addTicket } = useTicket();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "booking", title: "Booking" },
    { key: "drinks", title: "Drinks" },
    { key: "menu", title: "Menu" },
  ]);

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [menCount, setMenCount] = useState(0);
  const [womenCount, setWomenCount] = useState(0);

  const renderScene = SceneMap({
    booking: BookingRoute,
    drinks: DrinksRoute,
    menu: MenuRoute,
  });

  // Sample dates
  const availableDates = [
    "Today, Dec 15",
    "Tomorrow, Dec 16",
    "Sat, Dec 17",
    "Sun, Dec 18",
    "Mon, Dec 19",
  ];

  const PRICE_PER_PERSON = 1000;
  const totalPrice = (menCount + womenCount) * PRICE_PER_PERSON;

  // Use useCallback to prevent re-rendering
  const updateCount = useCallback((type, increment) => {
    if (type === "men") {
      setMenCount((prev) => Math.max(0, prev + (increment ? 1 : -1)));
    } else {
      setWomenCount((prev) => Math.max(0, prev + (increment ? 1 : -1)));
    }
  }, []);

  const handleAddToTicket = () => {
    if (!selectedDate) {
      Alert.alert("Error", "Please select a date");
      return;
    }
    if (menCount === 0 && womenCount === 0) {
      Alert.alert("Error", "Please add at least one person");
      return;
    }

    // Create ticket data
    const ticketData = {
      venue: "privee",
      name: "Privee",
      date: selectedDate,
      men: menCount,
      women: womenCount,
      totalPrice: totalPrice,
    };

    // Add to ticket using context
    addTicket(ticketData);

    Alert.alert(
      "Success! 🎉",
      `Added to your ticket!\n\n📍 Venue: Privee\n📅 Date: ${selectedDate}\n👥 People: ${
        menCount + womenCount
      }\n💰 Total: ₹${totalPrice}`,
      [
        {
          text: "Add More",
          onPress: () => {
            setShowPopup(false);
            // Reset form
            setSelectedDate("");
            setMenCount(0);
            setWomenCount(0);
          },
        },
        {
          text: "View Ticket",
          onPress: () => {
            setShowPopup(false);
            router.push("/ticket");
          },
        },
      ]
    );
  };

  // Memoized counter component to prevent re-renders
  const CounterRow = React.memo(({ label, count, onUpdate }) => (
    <View style={styles.counterRow}>
      <Text style={styles.counterLabel}>{label}</Text>
      <View style={styles.counter}>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => onUpdate(false)}
        >
          <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{count}</Text>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => onUpdate(true)}
        >
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  ));

  // Memoized date selector to prevent re-renders
  const DateSelector = React.memo(() => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.dateContainer}
    >
      {availableDates.map((date, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dateButton,
            selectedDate === date && styles.selectedDateButton,
          ]}
          onPress={() => setSelectedDate(date)}
        >
          <Text
            style={[
              styles.dateText,
              selectedDate === date && styles.selectedDateText,
            ]}
          >
            {date}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  ));

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Fixed Add Members Button */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={styles.fixedAddButton}
          onPress={() => setShowPopup(true)}
        >
          <Text style={styles.fixedAddButtonText}>Add Members</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Header Image and Info Section */}
          <View style={styles.headerContainer}>
            <Image
              source={require("../assets/images/clubbw.png")}
              style={styles.headerImage}
            />

            {/* Club Info */}
            <View style={styles.clubInfo}>
              <View>
                <Text style={styles.clubName}>Privee</Text>
                <Text style={styles.location}>Delhi NCR</Text>
              </View>

              <View style={styles.ratingBadge}>
                <AntDesign name="star" size={16} color="white" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width }}
              style={styles.tabView}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  style={styles.tabBar}
                  indicatorStyle={styles.tabIndicator}
                  labelStyle={styles.tabLabel}
                  activeColor="#000"
                  inactiveColor="#7d7979"
                />
              )}
            />
          </View>

          {/* Promotion Card */}
          <View style={styles.promoCard}>
            <View>
              <Text style={styles.promoTitle}>FLAT 25% OFF</Text>
              <Text style={styles.promoSubtitle}>Limited Slots Left</Text>
            </View>

            <View style={styles.slotsContainer}>
              <Text style={styles.slotsText}>Only 25 Slots Available</Text>
            </View>
          </View>

          {/* Menu Section */}
          <View style={styles.menuSection}>
            <Text style={styles.menuTitle}>Menu</Text>
            <View style={styles.menuImages}>
              <Image
                source={require("../assets/images/clubbw.png")}
                style={styles.menuImage}
              />
              <Image
                source={require("../assets/images/clubbw.png")}
                style={styles.menuImage}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.favoriteButton}>
              <Text style={styles.favoriteButtonText}>Add to Favourites</Text>
            </TouchableOpacity>
          </View>

          {/* Extra space for fixed button */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Add Members Popup */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Members</Text>
              <TouchableOpacity onPress={() => setShowPopup(false)}>
                <Feather name="x" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {/* Date Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Date</Text>
              <DateSelector />
            </View>

            {/* Member Count */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Number of People</Text>

              <CounterRow
                label="Men"
                count={menCount}
                onUpdate={(increment) => updateCount("men", increment)}
              />

              <CounterRow
                label="Women"
                count={womenCount}
                onUpdate={(increment) => updateCount("women", increment)}
              />
            </View>

            {/* Total Price */}
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Total Price:</Text>
              <Text style={styles.totalPrice}>₹{totalPrice}</Text>
            </View>

            {/* Add to Ticket Button */}
            <TouchableOpacity
              style={styles.addToTicketButton}
              onPress={handleAddToTicket}
            >
              <Text style={styles.addToTicketText}>Add to Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 20,
  },
  fixedAddButton: {
    backgroundColor: "#e91174",
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fixedAddButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Montserrat-Medium",
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 120,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "black",
  },
  headerContainer: {
    height: 380,
  },
  headerImage: {
    width: "100%",
    height: 404,
  },
  clubInfo: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 13,
    bottom: 15,
    left: 0,
    right: 0,
  },
  clubName: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "600",
    fontSize: 36,
    color: "white",
  },
  location: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "500",
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  ratingBadge: {
    backgroundColor: "#e91174",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  ratingText: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "500",
    color: "white",
    fontSize: 14,
  },
  tabContainer: {
    height: 60,
    marginTop: 0,
    zIndex: 1,
  },
  tabView: {
    height: 60,
  },
  tabBar: {
    top: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 23,
    marginHorizontal: 43,
    height: 45,
    padding: 0,
    justifyContent: "center",
  },
  tabIndicator: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e91174",
    borderRadius: 23,
    height: "100%",
  },
  tabLabel: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "500",
    fontSize: 13,
    textTransform: "none",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  promoCard: {
    backgroundColor: "#fdbedb",
    borderRadius: 30,
    marginHorizontal: 21,
    marginTop: 26,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 14.5,
    elevation: 5,
  },
  promoTitle: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "600",
    fontSize: 18,
    color: "black",
  },
  promoSubtitle: {
    fontFamily: "Montserrat-Medium",
    fontSize: 11.1,
    color: "black",
    marginTop: 2,
  },
  slotsContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginTop: 10,
    paddingVertical: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 9.2,
    elevation: 3,
  },
  slotsText: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "600",
    fontSize: 10,
    color: "black",
  },
  menuSection: {
    marginHorizontal: 40,
    marginTop: 16,
  },
  menuTitle: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 15,
    color: "black",
    marginLeft: 9,
  },
  menuImages: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
  },
  menuImage: {
    width: 150,
    height: 147,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 51,
    marginTop: 37,
    padding: 11,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 18.9,
    elevation: 5,
  },
  favoriteButton: {
    borderWidth: 1,
    borderColor: "#e91174",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  favoriteButtonText: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "600",
    fontSize: 11,
    color: "#e91174",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "black",
    fontFamily: "Montserrat-Medium",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: 15,
    fontFamily: "Montserrat-Medium",
  },
  dateContainer: {
    flexDirection: "row",
  },
  dateButton: {
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedDateButton: {
    backgroundColor: "#e91174",
    borderColor: "#e91174",
  },
  dateText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedDateText: {
    color: "white",
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  counterLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    paddingHorizontal: 8,
  },
  counterButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#e91174",
  },
  counterValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginHorizontal: 20,
    minWidth: 20,
    textAlign: "center",
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#e91174",
  },
  addToTicketButton: {
    backgroundColor: "#e91174",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addToTicketText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Montserrat-Medium",
  },
});
