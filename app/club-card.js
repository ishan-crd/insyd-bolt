import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Animated,
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
import { useTicket } from "./contexts/TicketContext";

const { width, height } = Dimensions.get("window");

export default function ClubCard() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addTicket } = useTicket();

  // Get club data from params
  const clubData = {
    id: params.clubId || "1",
    name: params.clubName || "Privee",
    location: params.clubLocation || "Delhi NCR",
    rating: params.clubRating || "4.8",
    type: params.clubType || "premium",
    description: params.clubDescription || "Exclusive nightlife experience",
  };

  // Default images mapping
  const getClubImage = () => {
    const imageMap = {
      1: require("../assets/images/restaurantkitty.png"), // Privee
      2: require("../assets/images/playboy.jpg"), // PlayBoy
      3: require("../assets/images/clubbw.png"), // Club BW
      4: require("../assets/images/whiteclub.png"), // White Club
    };
    return imageMap[clubData.id] || require("../assets/images/clubbw.png");
  };

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

  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastAnimation] = useState(new Animated.Value(0));

  const BookingRoute = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabContentText}>
        Booking information for {clubData.name} coming soon...
      </Text>
    </View>
  );

  const DrinksRoute = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabContentText}>
        Drinks menu for {clubData.name} coming soon...
      </Text>
    </View>
  );

  const MenuRoute = () => (
    <View style={styles.tabContent}>
      <Text style={styles.tabContentText}>
        Food menu for {clubData.name} coming soon...
      </Text>
    </View>
  );

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

  // Toast animation functions - FIXED VERSION (no useCallback)
  const showToastNotification = () => {
    setTimeout(() => {
      setShowToast(true);
      toastAnimation.setValue(0);

      Animated.sequence([
        Animated.timing(toastAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(toastAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => setShowToast(false), 0);
      });
    }, 0);
  };

  // Simple counter update function
  const updateCount = (type, increment) => {
    if (type === "men") {
      setMenCount((prev) => Math.max(0, prev + (increment ? 1 : -1)));
    } else {
      setWomenCount((prev) => Math.max(0, prev + (increment ? 1 : -1)));
    }
  };

  const handleAddToTicket = () => {
    if (!selectedDate) {
      Alert.alert("Error", "Please select a date");
      return;
    }
    if (menCount === 0 && womenCount === 0) {
      Alert.alert("Error", "Please add at least one person");
      return;
    }

    // Create ticket data with dynamic club info
    const ticketData = {
      venue: clubData.id,
      name: clubData.name,
      location: clubData.location,
      date: selectedDate,
      men: menCount,
      women: womenCount,
      totalPrice: totalPrice,
    };

    // Add to ticket using context
    addTicket(ticketData);

    // Close modal and reset form
    setShowPopup(false);
    setSelectedDate("");
    setMenCount(0);
    setWomenCount(0);

    // ALWAYS show toast notification, even for same club/date combinations
    setTimeout(() => {
      showToastNotification();
    }, 300);
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
        {/* Header Image and Info Section */}
        <View style={styles.headerContainer}>
          <Image source={getClubImage()} style={styles.headerImage} />
          <View style={styles.imageOverlay} />

          {/* Header buttons overlay on image */}
          <View style={styles.headerOverlayButtons}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <MaterialIcons name="share" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Club Info */}
          <View style={styles.clubInfo}>
            <View>
              <Text style={styles.clubName}>{clubData.name}</Text>
              <Text style={styles.location}>{clubData.location}</Text>
            </View>

            <View style={styles.ratingBadge}>
              <AntDesign name="star" size={16} color="white" />
              <Text style={styles.ratingText}>{clubData.rating}</Text>
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
                activeColor="#fff"
                inactiveColor="#999"
              />
            )}
          />
        </View>

        {/* Promotion Card */}
        <View style={styles.promoCard}>
          <View style={styles.promoContent}>
            <View>
              <Text style={styles.promoTitle}>FLAT 25% OFF</Text>
              <Text style={styles.promoSubtitle}>Limited Slots Left</Text>
            </View>
            <View style={styles.slotsContainer}>
              <Text style={styles.slotsText}>Only 25 Slots Available</Text>
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <MaterialIcons name="music-note" size={20} color="#EC4899" />
              <Text style={styles.featureText}>Live DJ</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="local-bar" size={20} color="#EC4899" />
              <Text style={styles.featureText}>Premium Bar</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="restaurant" size={20} color="#EC4899" />
              <Text style={styles.featureText}>Fine Dining</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="wifi" size={20} color="#EC4899" />
              <Text style={styles.featureText}>Free WiFi</Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.menuImages}>
              <Image source={getClubImage()} style={styles.menuImage} />
              <Image
                source={require("../assets/images/playboy.jpg")}
                style={styles.menuImage}
              />
              <Image
                source={require("../assets/images/whiteclub.png")}
                style={styles.menuImage}
              />
            </View>
          </ScrollView>
        </View>

        {/* Extra space for fixed button */}
        <View style={{ height: 100 }} />
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
                <Feather name="x" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Club Info in Modal */}
            <View style={styles.modalClubInfo}>
              <Text style={styles.modalClubName}>{clubData.name}</Text>
              <Text style={styles.modalClubLocation}>{clubData.location}</Text>
            </View>

            {/* Date Selection */}
            <View style={styles.section}>
              <Text style={styles.modalSectionTitle}>Select Date</Text>
              <DateSelector />
            </View>

            {/* Member Count */}
            <View style={styles.section}>
              <Text style={styles.modalSectionTitle}>Number of People</Text>

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

      {/* Toast Notification */}
      {showToast && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              opacity: toastAnimation,
              transform: [
                {
                  translateY: toastAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.toastContent}>
            <View style={styles.toastIconContainer}>
              <MaterialIcons name="check-circle" size={24} color="#fff" />
            </View>
            <View style={styles.toastTextContainer}>
              <Text style={styles.toastTitle}>Ticket Added!</Text>
              <Text style={styles.toastMessage}>
                {clubData.name} added to your ticket
              </Text>
            </View>
            <TouchableOpacity
              style={styles.toastButton}
              onPress={() => router.push("/ticket")}
            >
              <Text style={styles.toastButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight + 10,
    paddingBottom: 10,
    backgroundColor: "#000",
    zIndex: 100,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
  },
  // New header overlay styles
  headerOverlayButtons: {
    position: "absolute",
    top: StatusBar.currentHeight + 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 200,
  },
  headerButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#EC4899",
    borderRadius: 999,
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat-Medium",
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 120,
  },
  headerContainer: {
    height: 300,
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  clubInfo: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    bottom: 20,
    left: 0,
    right: 0,
  },
  clubName: {
    fontFamily: "NeuePlakExtendedBlack",
    fontSize: 32,
    color: "#fff",
  },
  location: {
    fontFamily: "Montserrat-Light",
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  ratingBadge: {
    backgroundColor: "#EC4899",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  ratingText: {
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    fontSize: 14,
  },
  tabContainer: {
    height: 100,
    marginTop: 20,
  },
  tabView: {
    height: 100,
  },
  tabBar: {
    backgroundColor: "#111",
    borderRadius: 14,
    marginHorizontal: 20,
    height: 45,
  },
  tabIndicator: {
    backgroundColor: "#EC4899",
    borderRadius: 14,
    height: "100%",
  },
  tabLabel: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    textTransform: "none",
  },
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tabContentText: {
    color: "#999",
    fontFamily: "Montserrat-Light",
    fontSize: 14,
    textAlign: "center",
  },
  promoCard: {
    backgroundColor: "#111",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EC4899",
  },
  promoContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promoTitle: {
    fontFamily: "NeuePlakExtendedBlack",
    fontSize: 18,
    color: "#EC4899",
  },
  promoSubtitle: {
    fontFamily: "Montserrat-Light",
    fontSize: 12,
    color: "#ccc",
    marginTop: 4,
  },
  slotsContainer: {
    backgroundColor: "#EC4899",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  slotsText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 10,
    color: "#fff",
  },
  featuresSection: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 15,
  },
  featuresList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  featureText: {
    color: "#fff",
    fontFamily: "Montserrat-Light",
    fontSize: 12,
  },
  menuSection: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  menuImages: {
    flexDirection: "row",
    gap: 15,
    paddingRight: 20,
  },
  menuImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#111",
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
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
  },
  modalClubInfo: {
    backgroundColor: "#222",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  modalClubName: {
    fontSize: 18,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 4,
  },
  modalClubLocation: {
    fontSize: 14,
    fontFamily: "Montserrat-Light",
    color: "#ccc",
  },
  section: {
    marginBottom: 25,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: "row",
  },
  dateButton: {
    backgroundColor: "#222",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  selectedDateButton: {
    backgroundColor: "#EC4899",
    borderColor: "#EC4899",
  },
  dateText: {
    color: "#ccc",
    fontSize: 14,
    fontFamily: "Montserrat-Light",
  },
  selectedDateText: {
    color: "#fff",
    fontFamily: "Montserrat-Medium",
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  counterLabel: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
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
    fontWeight: "bold",
    color: "#EC4899",
  },
  counterValue: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
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
    borderTopColor: "#333",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
  },
  totalPrice: {
    fontSize: 24,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#EC4899",
  },
  addToTicketButton: {
    backgroundColor: "#EC4899",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addToTicketText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat-Medium",
  },
  // Toast Notification Styles
  toastContainer: {
    position: "absolute",
    top: StatusBar.currentHeight + 60,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  toastContent: {
    backgroundColor: "#EC4899",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  toastIconContainer: {
    marginRight: 12,
  },
  toastTextContainer: {
    flex: 1,
  },
  toastTitle: {
    fontSize: 16,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 2,
  },
  toastMessage: {
    fontSize: 14,
    fontFamily: "Montserrat-Light",
    color: "#fff",
    opacity: 0.9,
  },
  toastButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 12,
  },
  toastButtonText: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
});
