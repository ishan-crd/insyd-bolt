import { Feather, FontAwesome } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Featured({ featuredClubs, onPress }) {
  return (
    <View style={styles.featuredSection}>
      <Text style={styles.sectionTitle}>FEATURED</Text>
      {featuredClubs.map((club) => (
        <TouchableOpacity
          key={club.id}
          style={styles.clubCard}
          onPress={onPress}
        >
          <Image source={club.image} style={styles.clubImage} />
          <View style={styles.imageOverlay} />
          <Feather
            name="bookmark"
            size={27}
            color="#ffff"
            style={styles.bookmark}
          />
          <View style={styles.clubInfo}>
            <View>
              <Text style={styles.clubName}>{club.name}</Text>
              <Text style={styles.clubLocation}>{club.location}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <FontAwesome name="star" size={12} color="white" />
              <Text style={styles.ratingText}>{club.rating}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  featuredSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 13,
    color: "#B1B0B0",
    textAlign: "center",
    marginBottom: 24,
  },
  clubCard: {
    height: 199,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 26,
  },
  clubImage: {
    width: "100%",
    height: "100%",
  },
  clubInfo: {
    position: "absolute",
    bottom: 8,
    left: 16,
    gap: 190,
    flexDirection: "row",
  },
  ratingBadge: {
    position: "absolute",
    left: 280,
    top: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e91174",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  ratingText: {
    color: "white",
    fontSize: 13,
    marginLeft: 4,
  },
  clubName: {
    color: "white",
    fontSize: 35,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  clubLocation: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  bookmark: {
    position: "absolute",
    left: "88%",
    top: 20,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
});
