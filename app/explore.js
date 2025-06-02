import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather } from "lucide-react-native";
// Club data for the discover section
const discoverClubs = [
  { id: 1, title: "Nightclub", subtitle: "DJ Set" },
  { id: 2, title: "Nightclub", subtitle: "DJ Set" },
  { id: 3, title: "Nightclub", subtitle: "DJ Set" },
  { id: 4, title: "Nightclub", subtitle: "DJ Set" },
];

export default function Explore() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>insyd</Text>
            <View style={styles.logoDotWhite} />
            <View style={styles.logoDotPink} />
          </View>

          {/* Menu button */}
          <TouchableOpacity style={styles.menuButton}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Find clubs nearby"
            placeholderTextColor="#999"
          />
          <Feather
            name="search"
            size={17}
            color="#000"
            style={styles.searchIcon}
          />
        </View>

        {/* Discover clubs section */}
        <View style={styles.discoverSection}>
          <Text style={styles.sectionTitle}>Discover clubs</Text>

          <View style={styles.clubsList}>
            {discoverClubs.map((club) => (
              <TouchableOpacity key={club.id} style={styles.clubItem}>
                <View style={styles.clubItemLeft}>
                  <View style={styles.clubAvatar} />
                  <View style={styles.clubInfo}>
                    <Text style={styles.clubTitle}>{club.title}</Text>
                    <Text style={styles.clubSubtitle}>{club.subtitle}</Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={24} color="#000" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recommended clubs section */}
        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>Recommended clubs</Text>

          <View style={styles.recommendedContainer}>
            <View style={styles.largeCard} />

            <View style={styles.smallCardsContainer}>
              <View style={styles.smallCard} />
              <View style={styles.smallCard} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    width: 393,
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 18,
    marginBottom: 12,
  },
  logoContainer: {
    position: "relative",
    height: 32,
  },
  logoText: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "#424242",
    fontSize: 26,
  },
  logoDotWhite: {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    top: 2,
    left: 0,
  },
  logoDotPink: {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: "#e81174",
    borderRadius: 4,
    top: 1,
    left: 0,
  },
  menuButton: {
    padding: 4,
  },
  menuLine: {
    width: 24,
    height: 4,
    backgroundColor: "#424242",
    borderRadius: 49,
    marginVertical: 3.5,
  },
  searchContainer: {
    position: "relative",
    marginHorizontal: 16,
    marginBottom: 34,
  },
  searchInput: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 40,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
    backgroundColor: "#fff",
    fontFamily: "Montserrat",
    fontWeight: "200",
    fontSize: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 11.3,
    elevation: 5,
  },
  searchIcon: {
    position: "absolute",
    right: 16,
    top: 11.5,
  },
  discoverSection: {
    marginHorizontal: 16,
    marginBottom: 41,
  },
  sectionTitle: {
    fontFamily: "Montserrat",
    fontWeight: "600",
    color: "#424242",
    fontSize: 18,
    marginBottom: 40,
  },
  clubsList: {
    gap: 16,
  },
  clubItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 42,
  },
  clubItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  clubAvatar: {
    width: 42,
    height: 42,
    backgroundColor: "#d9d9d9",
    borderRadius: 21,
    marginRight: 10,
  },
  clubInfo: {
    justifyContent: "center",
  },
  clubTitle: {
    fontFamily: "Montserrat",
    fontWeight: "600",
    color: "#000",
    fontSize: 15,
  },
  clubSubtitle: {
    fontFamily: "Montserrat",
    fontWeight: "100",
    color: "#000",
    fontSize: 13,
  },
  recommendedSection: {
    marginHorizontal: 14,
    marginBottom: 40,
  },
  recommendedContainer: {
    width: 364,
    height: 251,
  },
  largeCard: {
    width: 364,
    height: 120,
    backgroundColor: "#d9d9d9",
    borderRadius: 22,
    marginBottom: 11,
  },
  smallCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallCard: {
    width: 178,
    height: 120,
    backgroundColor: "#d9d9d9",
    borderRadius: 22,
  },
});
