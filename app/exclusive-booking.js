import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
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
import { useTicket } from "./contexts/TicketContext";

const { width, height } = Dimensions.get("window");

export default function ExclusiveBooking() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addTicket } = useTicket();

  // Get exclusive offer data from params
  const offerData = {
    type: params.type || "weekend_special",
    title: params.title || "Weekend Special",
    subtitle: params.subtitle || "50% OFF on all bookings",
    description: params.description || "This weekend only",
    discount: params.discount || "50%",
    originalPrice: params.originalPrice || "2000",
    discountedPrice: params.discountedPrice || "1000",
  };

  // Available clubs for exclusive booking
  const exclusiveClubs = [
    {
      id: 1,
      name: "Privee",
      location: "Vasant Kunj, Delhi",
      rating: "4.8",
      image: require("../assets/images/restaurantkitty.png"),
      specialPrice: 800,
      originalPrice: 1200,
    },
    {
      id: 2,
      name: "PlayBoy",
      location: "Delhi NCR",
      rating: "4.5",
      image: require("../assets/images/playboy.jpg"),
      specialPrice: 900,
      originalPrice: 1500,
    },
    {
      id: 3,
      name: "Club BW",
      location: "Vasant Kunj, Delhi",
      rating: "4.5",
      image: require("../assets/images/clubbw.png"),
      specialPrice: 750,
      originalPrice: 1000,
    },
    {
      id: 4,
      name: "White Club",
      location: "New Delhi, Delhi",
      rating: "4.1",
      image: require("../assets/images/whiteclub.png"),
      specialPrice: 850,
      originalPrice: 1300,
    },
  ];

  // Modal states
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [menCount, setMenCount] = useState(0);
  const [womenCount, setWomenCount] = useState(0);

  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastAnimation] = useState(new Animated.Value(0));

  // Available dates for exclusive booking
  const availableDates = [
    "Sat, Dec 16",
    "Sun, Dec 17",
    "Fri, Dec 22",
    "Sat, Dec 23",
    "Sun, Dec 24",
  ];

  // Toast animation
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

  const handleClubPress = (club) => {
    setSelectedClub(club);
    setShowBookingModal(true);
  };

  const updateCount = (type, increment) => {
    if (type === "men") {
      setMenCount((prev) => Math.max(0, prev + (increment ? 1 : -1)));
    } else {
      setWomenCount((prev) => Math.max(0, prev + (increment ? 1 : -1)));
    }
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      Alert.alert("Error", "Please select a date");
      return;
    }
    if (menCount === 0 && womenCount === 0) {
      Alert.alert("Error", "Please add at least one person");
      return;
    }

    const totalPrice = (menCount + womenCount) * selectedClub.specialPrice;

    const ticketData = {
      venue: selectedClub.id.toString(),
      name: selectedClub.name,
      location: selectedClub.location,
      date: selectedDate,
      men: menCount,
      women: womenCount,
      totalPrice: totalPrice,
    };

    addTicket(ticketData);

    setShowBookingModal(false);
    setSelectedDate("");
    setMenCount(0);
    setWomenCount(0);

    setTimeout(() => {
      showToastNotification();
    }, 300);
  };

  const CounterRow = ({ label, count, onUpdate }) => (
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
  );

  const DateSelector = () => (
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
  );

  const totalPrice = selectedClub
    ? (menCount + womenCount) * selectedClub.specialPrice
    : 0;
  const savings = selectedClub
    ? (menCount + womenCount) *
      (selectedClub.originalPrice - selectedClub.specialPrice)
    : 0;

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exclusive Offers</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Enhanced Hero Section */}
        <View style={styles.compactHero}>
          <View style={styles.heroLayout}>
            <View style={styles.heroLeftContent}>
              <View style={styles.offerBadge}>
                <MaterialIcons name="local-offer" size={16} color="#fff" />
                <Text style={styles.offerBadgeText}>EXCLUSIVE DEAL</Text>
              </View>
              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>{offerData.title}</Text>
                <Text style={styles.heroSubtitle}>{offerData.subtitle}</Text>
                <Text style={styles.heroDescription}>
                  {offerData.description}
                </Text>
              </View>
            </View>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{offerData.discount}</Text>
              <Text style={styles.discountLabel}>OFF</Text>
            </View>
          </View>
        </View>

        {/* Available Clubs */}
        <View style={styles.clubsSection}>
          <Text style={styles.sectionTitle}>Choose Your Club</Text>
          <View style={styles.clubsList}>
            {exclusiveClubs.map((club) => (
              <TouchableOpacity
                key={club.id}
                style={styles.clubCard}
                onPress={() => handleClubPress(club)}
              >
                <Image source={club.image} style={styles.clubImage} />
                <View style={styles.clubOverlay} />

                <View style={styles.clubInfo}>
                  <View style={styles.clubHeader}>
                    <Text style={styles.clubName}>{club.name}</Text>
                    <View style={styles.ratingBadge}>
                      <AntDesign name="star" size={12} color="#fff" />
                      <Text style={styles.ratingText}>{club.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.clubLocation}>{club.location}</Text>

                  <View style={styles.priceInfo}>
                    <View style={styles.specialPriceContainer}>
                      <Text style={styles.originalPrice}>
                        ₹{club.originalPrice}
                      </Text>
                      <Text style={styles.specialPrice}>
                        ₹{club.specialPrice}
                      </Text>
                    </View>
                    <View style={styles.bookButton}>
                      <Text style={styles.bookButtonText}>Book Now</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* What's Included */}
        <View style={styles.offerDetailsCard}>
          <Text style={styles.cardTitle}>What's Included</Text>
          <View style={styles.includesList}>
            <View style={styles.includeItem}>
              <MaterialIcons name="check-circle" size={18} color="#EC4899" />
              <Text style={styles.includeText}>Entry to all premium clubs</Text>
            </View>
            <View style={styles.includeItem}>
              <MaterialIcons name="check-circle" size={18} color="#EC4899" />
              <Text style={styles.includeText}>
                Priority seating arrangement
              </Text>
            </View>
            <View style={styles.includeItem}>
              <MaterialIcons name="check-circle" size={18} color="#EC4899" />
              <Text style={styles.includeText}>
                Complimentary welcome drink
              </Text>
            </View>
            <View style={styles.includeItem}>
              <MaterialIcons name="check-circle" size={18} color="#EC4899" />
              <Text style={styles.includeText}>No additional booking fees</Text>
            </View>
          </View>
        </View>

        {/* Terms & Conditions */}
        <View style={styles.termsCard}>
          <Text style={styles.cardTitle}>Terms & Conditions</Text>
          <Text style={styles.termsText}>
            • Valid only on weekends (Fri-Sun){"\n"}• Cannot be combined with
            other offers{"\n"}• Subject to availability{"\n"}• Booking must be
            made 24 hours in advance{"\n"}• Age restriction: 21+ with valid ID
          </Text>
        </View>
      </ScrollView>

      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Complete Your Booking</Text>
              <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                <Feather name="x" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Selected Club Info */}
            {selectedClub && (
              <View style={styles.selectedClubInfo}>
                <Image
                  source={selectedClub.image}
                  style={styles.selectedClubImage}
                />
                <View style={styles.selectedClubDetails}>
                  <Text style={styles.selectedClubName}>
                    {selectedClub.name}
                  </Text>
                  <Text style={styles.selectedClubLocation}>
                    {selectedClub.location}
                  </Text>
                  <View style={styles.selectedClubPricing}>
                    <Text style={styles.modalOriginalPrice}>
                      ₹{selectedClub.originalPrice}
                    </Text>
                    <Text style={styles.modalSpecialPrice}>
                      ₹{selectedClub.specialPrice}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Date Selection */}
            <View style={styles.section}>
              <Text style={styles.modalSectionTitle}>Select Date</Text>
              <DateSelector />
            </View>

            {/* People Count */}
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

            {/* Price Summary */}
            <View style={styles.priceSummary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total People:</Text>
                <Text style={styles.summaryValue}>{menCount + womenCount}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>You Save:</Text>
                <Text style={styles.savingsValue}>₹{savings}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={styles.totalPrice}>₹{totalPrice}</Text>
              </View>
            </View>

            {/* Book Now Button */}
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={handleBookNow}
            >
              <Text style={styles.bookNowText}>
                Book Now - Save ₹{savings}!
              </Text>
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
              <MaterialIcons name="celebration" size={24} color="#fff" />
            </View>
            <View style={styles.toastTextContainer}>
              <Text style={styles.toastTitle}>
                Exclusive Booking Confirmed!
              </Text>
              <Text style={styles.toastMessage}>
                Your special offer has been applied
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
    paddingTop: StatusBar.currentHeight + 60,
    paddingBottom: 20,
    backgroundColor: "#000",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  // Compact Hero Section
  compactHero: {
    backgroundColor: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
    backgroundColor: "#EC4899",
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 25,
    borderWidth: 2,
    borderColor: "#FF6BC7",
    shadowColor: "#EC4899",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  heroLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroLeftContent: {
    flex: 1,
  },
  offerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    alignSelf: "flex-start",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  offerBadgeText: {
    fontSize: 11,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
    marginBottom: 4,
    opacity: 0.95,
  },
  heroDescription: {
    fontSize: 13,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    opacity: 0.85,
  },
  discountBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginLeft: 20,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  discountText: {
    fontSize: 28,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    lineHeight: 28,
  },
  discountLabel: {
    fontSize: 12,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
    marginTop: 4,
    letterSpacing: 1,
  },
  // Clubs Section
  clubsSection: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 20,
  },
  clubsList: {
    gap: 15,
  },
  clubCard: {
    backgroundColor: "#111",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#222",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  clubImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#222",
  },
  clubOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  clubInfo: {
    padding: 20,
  },
  clubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  clubName: {
    fontSize: 18,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EC4899",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
  clubLocation: {
    fontSize: 12,
    fontFamily: "Montserrat-Light",
    color: "#999",
    marginBottom: 15,
  },
  priceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  specialPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    color: "#999",
    textDecorationLine: "line-through",
  },
  specialPrice: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#EC4899",
  },
  bookButton: {
    backgroundColor: "#EC4899",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bookButtonText: {
    fontSize: 12,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  // Cards
  offerDetailsCard: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#222",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 20,
  },
  includesList: {
    gap: 15,
  },
  includeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  includeText: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    color: "#ccc",
    flex: 1,
  },
  // Terms
  termsCard: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#222",
  },
  termsText: {
    fontSize: 12,
    fontFamily: "Montserrat-Light",
    color: "#999",
    lineHeight: 18,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#111",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: height * 0.85,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
  },
  selectedClubInfo: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#333",
  },
  selectedClubImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  selectedClubDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  selectedClubName: {
    fontSize: 16,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 4,
  },
  selectedClubLocation: {
    fontSize: 12,
    fontFamily: "Montserrat-Light",
    color: "#999",
    marginBottom: 6,
  },
  selectedClubPricing: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  modalOriginalPrice: {
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: "#999",
    textDecorationLine: "line-through",
  },
  modalSpecialPrice: {
    fontSize: 16,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#EC4899",
  },
  section: {
    marginBottom: 25,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 15,
  },
  dateContainer: {
    flexDirection: "row",
  },
  dateButton: {
    backgroundColor: "#222",
    borderRadius: 15,
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
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
  },
  selectedDateText: {
    color: "#fff",
    fontFamily: "Montserrat-Bold",
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  counterLabel: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  counterButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EC4899",
  },
  counterValue: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: "center",
  },
  priceSummary: {
    backgroundColor: "#222",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#333",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: "Montserrat-Light",
    color: "#999",
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
  savingsValue: {
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
    color: "#10B981",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
  },
  totalPrice: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#EC4899",
  },
  bookNowButton: {
    backgroundColor: "#EC4899",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bookNowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat-Bold",
  },
  // Toast Notification
  toastContainer: {
    position: "absolute",
    top: StatusBar.currentHeight + 60,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  toastContent: {
    backgroundColor: "#10B981",
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
    fontSize: 14,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 2,
  },
  toastMessage: {
    fontSize: 12,
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
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
});
