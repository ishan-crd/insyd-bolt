import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

import { Feather } from "lucide-react-native";
// Club data for the discover section
const discoverClubs = [
  {
    id: 1,
    title: "Club BW",
    subtitle: "New Delhi",
    imageUrl: require("../assets/images/clubbw.png"),
  },
  {
    id: 2,
    title: "Playboy",
    subtitle: "Vasant Kunj",
    imageUrl: require("../assets/images/playboy.jpg"),
  },
  {
    id: 3,
    title: "Privee",
    subtitle: "Noida",
    imageUrl: require("../assets/images/restaurantkitty.png"),
  },
  {
    id: 4,
    title: "White Club",
    subtitle: "Greater Noida",
    imageUrl: require("../assets/images/whiteclub.png"),
  },
];

export default function Explore() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <SearchBar />
        <View style={styles.discoverSection}>
          <Text style={styles.sectionTitle}>Discover clubs</Text>

          <View style={styles.clubsList}>
            {discoverClubs.map((club) => (
              <TouchableOpacity key={club.id} style={styles.clubItem}>
                <View style={styles.clubItemLeft}>
                  <Image source={club.imageUrl} style={styles.clubAvatar} />
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
            <Image
              source={require("../assets/images/playboy.jpg")}
              style={styles.largeCard}
            />

            <View style={styles.smallCardsContainer}>
              <Image
                source={require("../assets/images/restaurantkitty.png")}
                style={styles.smallCard}
              />
              <Image
                source={require("../assets/images/clubbw.png")}
                style={styles.smallCard}
              />
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
  },
  discoverSection: {
    marginHorizontal: 16,
    marginBottom: 30,
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: "Montserrat",
    fontWeight: "600",
    color: "#424242",
    fontSize: 18,
    marginBottom: 16,
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
