import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = 167;
const CARD_HEIGHT = 194;
const CARD_GAP = 25.56;
const TOTAL_HORIZONTAL_PADDING = 40; // 20 left + 20 right
const COLUMNS = 2;
const TOTAL_GAP = CARD_GAP * (COLUMNS - 1);
const GRID_WIDTH = CARD_WIDTH * COLUMNS + TOTAL_GAP;

export default function Featured({ featuredClubs, onPress }) {
  return (
    <View style={styles.featuredSection}>
      <View style={styles.featuredGrid}>
        {featuredClubs.map((club) => (
          <TouchableOpacity
            key={club.id}
            style={styles.clubCard}
            onPress={onPress}
          >
            <Image source={club.image} style={styles.clubImage} />
            <View style={styles.imageOverlay} />

            <View style={styles.clubInfoWrapper}>
              <View style={styles.clubInfoTop}>
                <Text style={styles.clubName}>{club.name}</Text>
              </View>
              <View style={styles.clubInfoBottom}>
                <Text style={styles.clubLocation}>{club.location}</Text>
                </View>
              </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  featuredSection: {
    paddingHorizontal: 0,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "left",
    marginBottom: 16,
    fontFamily: "NeuePlakExtendedBlack",
  },
  featuredGrid: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: CARD_GAP,
    maxWidth: GRID_WIDTH,
  },
  clubCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    marginBottom: CARD_GAP,
    position: "relative",
  },
  clubImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  clubInfoWrapper: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 20,
  },
  clubInfoTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clubInfoBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
  },
  clubName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "NeuePlakExtendedBlack",
  },
  clubLocation: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    opacity: 0.85,
  },
  ratingText: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "600",
  },
});
