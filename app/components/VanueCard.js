import { Feather } from "@expo/vector-icons";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function VenueCard({ ticket, onRemove, onUpdateCount }) {
  const getImageUrl = (venue) => {
    const imageMap = {
      privee:
        "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
      playboy:
        "https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg",
      clubBw:
        "https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg",
    };
    return (
      imageMap[venue] ||
      "https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg"
    );
  };

  return (
    <View style={styles.venueCard}>
      <Image
        source={{ uri: getImageUrl(ticket.venue) }}
        style={styles.venueImage}
        resizeMode="cover"
      />
      <View style={styles.venueDetails}>
        <View style={styles.venueHeader}>
          <View>
            <Text style={styles.venueName}>{ticket.name}</Text>
            <Text style={styles.venueDate}>{ticket.date}</Text>
          </View>
          <TouchableOpacity onPress={() => onRemove(ticket.venue)}>
            <Feather name="x" size={16} color="black" />
          </TouchableOpacity>
        </View>

        {ticket.men > 0 && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterLabel}>Men</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => onUpdateCount(ticket.venue, "men", false)}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{ticket.men}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => onUpdateCount(ticket.venue, "men", true)}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {ticket.women > 0 && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterLabel}>Women</Text>
            <View style={styles.counter}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => onUpdateCount(ticket.venue, "women", false)}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterValue}>{ticket.women}</Text>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => onUpdateCount(ticket.venue, "women", true)}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price: ₹{ticket.totalPrice}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  venueCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 6,
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
    width: "100%",
    height: 120,
    borderRadius: 16,
    marginBottom: 15,
  },
  venueDetails: {
    flex: 1,
  },
  venueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  venueName: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
    marginBottom: 4,
  },
  venueDate: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  counterLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3e3e3e",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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
    color: "#e91174",
    fontWeight: "600",
  },
  counterValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e91174",
  },
});
