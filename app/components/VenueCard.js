import { Feather, MaterialIcons } from "@expo/vector-icons";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function VenueCard({ ticket, onRemove, onUpdateCount }) {
  const getClubImage = (venueId) => {
    const imageMap = {
      1: require("../../assets/images/restaurantkitty.png"), // Privee
      2: require("../../assets/images/playboy.jpg"), // PlayBoy
      3: require("../../assets/images/clubbw.png"), // Club BW
      4: require("../../assets/images/whiteclub.png"), // White Club
      // Fallback for old venue names
      privee: require("../../assets/images/restaurantkitty.png"),
      playboy: require("../../assets/images/playboy.jpg"),
      clubBw: require("../../assets/images/clubbw.png"),
    };
    return imageMap[venueId] || require("../../assets/images/clubbw.png");
  };

  return (
    <View style={styles.venueCard}>
      <View style={styles.imageContainer}>
        <Image
          source={getClubImage(ticket.venue)}
          style={styles.venueImage}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />

        {/* Venue info overlay on image */}
        <View style={styles.venueInfoOverlay}>
          <View>
            <Text style={styles.venueNameOverlay}>{ticket.name}</Text>
            <View style={styles.dateContainer}>
              <MaterialIcons name="event" size={14} color="#ccc" />
              <Text style={styles.venueDateOverlay}>{ticket.date}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemove(ticket.id)} // Use ticket.id instead of ticket.venue
          >
            <Feather name="x" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.venueDetails}>
        {ticket.men > 0 && (
          <View style={styles.counterContainer}>
            <View style={styles.counterLabelContainer}>
              <MaterialIcons name="person" size={18} color="#EC4899" />
              <Text style={styles.counterLabel}>Men</Text>
            </View>
            <View style={styles.counter}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => onUpdateCount(ticket.id, "men", false)} // Use ticket.id
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{ticket.men}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => onUpdateCount(ticket.id, "men", true)} // Use ticket.id
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {ticket.women > 0 && (
          <View style={styles.counterContainer}>
            <View style={styles.counterLabelContainer}>
              <MaterialIcons name="person" size={18} color="#EC4899" />
              <Text style={styles.counterLabel}>Women</Text>
            </View>
            <View style={styles.counter}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => onUpdateCount(ticket.id, "women", false)} // Use ticket.id
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{ticket.women}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => onUpdateCount(ticket.id, "women", true)} // Use ticket.id
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.priceContainer}>
          <MaterialIcons name="payments" size={20} color="#EC4899" />
          <Text style={styles.priceLabel}>₹{ticket.totalPrice}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  venueCard: {
    backgroundColor: "#111",
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#222",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  imageContainer: {
    position: "relative",
    height: 140,
  },
  venueImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  venueInfoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 16,
  },
  venueNameOverlay: {
    fontSize: 18,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  venueDateOverlay: {
    fontSize: 12,
    fontFamily: "Montserrat-Light",
    color: "#ccc",
  },
  removeButton: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  venueDetails: {
    padding: 16,
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  counterLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    paddingHorizontal: 4,
  },
  counterButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    fontSize: 18,
    color: "#EC4899",
    fontWeight: "bold",
  },
  counterValue: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  priceLabel: {
    fontSize: 18,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#EC4899",
  },
});
