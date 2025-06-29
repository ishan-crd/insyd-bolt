import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Featured from "./components/Featured";

const { width } = Dimensions.get("window");
const router = useRouter();
SplashScreen.preventAutoHideAsync();

export default function Home() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const baseClubs = [
    {
      id: 1,
      name: "Privee",
      location: "Vasant Kunj, Delhi",
      rating: "4.8",
      image: require("../assets/images/restaurantkitty.png"),
      type: "premium",
      description: "Exclusive rooftop experience",
    },
    {
      id: 2,
      name: "PlayBoy",
      location: "Delhi NCR",
      rating: "4.5",
      image: require("../assets/images/playboy.jpg"),
      type: "party",
      description: "Ultimate party destination",
    },
    {
      id: 3,
      name: "Club BW",
      location: "Vasant Kunj, Delhi",
      rating: "4.5",
      image: require("../assets/images/clubbw.png"),
      type: "lounge",
      description: "Sophisticated nightlife",
    },
    {
      id: 4,
      name: "White Club",
      location: "New Delhi, Delhi",
      rating: "4.1",
      image: require("../assets/images/whiteclub.png"),
      type: "elegant",
      description: "Refined elegance",
    },
  ];

  const promotionalAds = [
    {
      id: "ad1",
      type: "weekend_special",
      title: "Weekend Special",
      subtitle: "50% OFF on all bookings",
      description: "This weekend only",
      image: require("../assets/images/playboy.jpg"),
      color: "#EC4899",
    },
    {
      id: "ad2",
      type: "new_year",
      title: "New Year Bash",
      subtitle: "Book your spot now",
      description: "Limited slots available",
      image: require("../assets/images/clubbw.png"),
      color: "#8B5CF6",
    },
    {
      id: "ad3",
      type: "vip_experience",
      title: "VIP Experience",
      subtitle: "Exclusive access",
      description: "For premium members",
      image: require("../assets/images/whiteclub.png"),
      color: "#F59E0B",
    },
  ];

  useEffect(() => {
    loadFonts();
    generateInitialContent();
  }, []);

  async function loadFonts() {
    try {
      await Font.loadAsync({
        "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
        "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf"),
        "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
        "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
        NeuePlakExtendedBlack: require("../assets/fonts/NeuePlakExtendedBlack.ttf"),
        NeuePlakExtendedBold: require("../assets/fonts/NeuePlakExtendedBold.ttf"),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.warn("Error loading fonts:", error);
    } finally {
      await SplashScreen.hideAsync();
    }
  }

  const generateInitialContent = () => {
    const initialContent = [
      { type: "header" },
      { type: "search" },
      { type: "hero" },
      { type: "section_title", title: "Featured Clubs" },
      { type: "featured_clubs", clubs: baseClubs.slice(0, 2) },
      { type: "promotional_ad", ad: promotionalAds[0] },
      { type: "section_title", title: "Trending Now" },
      { type: "grid_clubs", clubs: baseClubs.slice(2) },
      { type: "category_section" },
    ];
    setContentData(initialContent);
  };

  const loadMoreContent = useCallback(() => {
    if (loading) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newContent = [];
      const adIndex = (page - 1) % promotionalAds.length;

      // Add varied content based on page number
      if (page % 2 === 0) {
        newContent.push(
          { type: "promotional_ad", ad: promotionalAds[adIndex] },
          { type: "section_title", title: "Recommended For You" },
          {
            type: "horizontal_clubs",
            clubs: [...baseClubs].sort(() => Math.random() - 0.5),
          }
        );
      } else {
        newContent.push(
          { type: "section_title", title: "Popular This Week" },
          { type: "large_cards", clubs: baseClubs.slice(0, 2) },
          { type: "stats_section" }
        );
      }

      if (page % 3 === 0) {
        newContent.push({
          type: "exclusive_offer",
          title: "Exclusive Membership",
          subtitle: "Join insyd Premium",
          description: "Get access to exclusive events and priority booking",
        });
      }

      setContentData((prev) => [...prev, ...newContent]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 1000);
  }, [loading, page]);

  const handleClubPress = (club) => {
    router.push({
      pathname: "/club-card",
      params: {
        clubId: club.id.toString(),
        clubName: club.name,
        clubLocation: club.location,
        clubRating: club.rating,
        clubType: club.type,
        clubDescription: club.description,
      },
    });
  };

  const renderClubCard = (club, style = "default") => {
    switch (style) {
      case "large":
        return (
          <TouchableOpacity
            style={styles.largeClubCard}
            onPress={() => handleClubPress(club)}
            key={club.id}
          >
            <Image source={club.image} style={styles.largeClubImage} />
            <View style={styles.largeClubOverlay} />
            <View style={styles.largeClubInfo}>
              <Text style={styles.largeClubName}>{club.name}</Text>
              <Text style={styles.largeClubDesc}>{club.description}</Text>
              <View style={styles.largeClubMeta}>
                <Text style={styles.largeClubLocation}>{club.location}</Text>
                <View style={styles.ratingBadge}>
                  <MaterialIcons name="star" size={14} color="#fff" />
                  <Text style={styles.ratingText}>{club.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );

      case "grid":
        return (
          <TouchableOpacity
            style={styles.gridClubCard}
            onPress={() => handleClubPress(club)}
            key={club.id}
          >
            <Image source={club.image} style={styles.gridClubImage} />
            <View style={styles.gridClubOverlay} />
            <View style={styles.gridClubInfo}>
              <Text style={styles.gridClubName}>{club.name}</Text>
              <Text style={styles.gridClubLocation}>{club.location}</Text>
              <View style={styles.gridRatingBadge}>
                <MaterialIcons name="star" size={12} color="#fff" />
                <Text style={styles.gridRatingText}>{club.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );

      case "horizontal":
        return (
          <TouchableOpacity
            style={styles.horizontalClubCard}
            onPress={() => handleClubPress(club)}
            key={club.id}
          >
            <Image source={club.image} style={styles.horizontalClubImage} />
            <View style={styles.horizontalClubOverlay} />
            <View style={styles.horizontalClubInfo}>
              <Text style={styles.horizontalClubName}>{club.name}</Text>
              <View style={styles.horizontalRatingBadge}>
                <MaterialIcons name="star" size={12} color="#fff" />
                <Text style={styles.horizontalRatingText}>{club.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  const renderContent = ({ item, index }) => {
    switch (item.type) {
      case "header":
        return (
          <View style={styles.headerWrapper}>
            <Text style={styles.logoText}>
              <Text style={styles.logoPink}>in</Text>syd
            </Text>
            <TouchableOpacity onPress={() => router.push("/ticket")}>
              <MaterialIcons name="local-activity" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        );

      case "search":
        return (
          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="Search clubs, events..."
              placeholderTextColor="#999"
              style={styles.searchInput}
            />
            <TouchableOpacity>
              <MaterialIcons name="filter-list" size={26} color="#999" />
            </TouchableOpacity>
          </View>
        );

      case "hero":
        return (
          <View style={styles.heroContainer}>
            <Image
              source={require("../assets/images/playboy.jpg")}
              style={styles.heroImage}
            />
            <View style={styles.imageOverlay} />
            <View style={styles.heroTextWrapper}>
              <Text style={styles.heroTitle}>PlayBoy</Text>
              <Text style={styles.heroSub}>
                <Text style={styles.logoTextexc}>
                  <Text style={styles.logoPinkexc}>in</Text>syd
                </Text>{" "}
                Exclusive
              </Text>
            </View>
          </View>
        );

      case "section_title":
        return <Text style={styles.sectionTitle}>{item.title}</Text>;

      case "featured_clubs":
        return (
          <Featured featuredClubs={item.clubs} onPress={handleClubPress} />
        );

      case "grid_clubs":
        return (
          <View style={styles.gridContainer}>
            {item.clubs.map((club) => renderClubCard(club, "grid"))}
          </View>
        );

      case "large_cards":
        return (
          <View style={styles.largeCardsContainer}>
            {item.clubs.map((club) => renderClubCard(club, "large"))}
          </View>
        );

      case "horizontal_clubs":
        return (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
          >
            {item.clubs.map((club) => renderClubCard(club, "horizontal"))}
          </ScrollView>
        );

      case "promotional_ad":
        return (
          <TouchableOpacity
            style={[styles.promotionalAd, { borderColor: item.ad.color }]}
          >
            <Image source={item.ad.image} style={styles.adImage} />
            <View
              style={[
                styles.adOverlay,
                { backgroundColor: `${item.ad.color}CC` },
              ]}
            />
            <View style={styles.adContent}>
              <View style={styles.adBadge}>
                <Text style={styles.adBadgeText}>EXCLUSIVE</Text>
              </View>
              <Text style={styles.adTitle}>{item.ad.title}</Text>
              <Text style={styles.adSubtitle}>{item.ad.subtitle}</Text>
              <Text style={styles.adDescription}>{item.ad.description}</Text>
              <View style={styles.adButton}>
                <Text style={styles.adButtonText}>Book Now</Text>
                <MaterialIcons name="arrow-forward" size={16} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>
        );

      case "category_section":
        return (
          <View style={styles.categorySection}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <View style={styles.categoryGrid}>
              {[
                { name: "Rooftop", icon: "apartment", color: "#EC4899" },
                { name: "Lounge", icon: "weekend", color: "#8B5CF6" },
                { name: "Dance", icon: "music-note", color: "#F59E0B" },
                { name: "Premium", icon: "star", color: "#10B981" },
              ].map((category, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.categoryCard, { borderColor: category.color }]}
                >
                  <MaterialIcons
                    name={category.icon}
                    size={24}
                    color={category.color}
                  />
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case "stats_section":
        return (
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>This Week's Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>2.5K+</Text>
                <Text style={styles.statLabel}>Party Goers</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>50+</Text>
                <Text style={styles.statLabel}>Events</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>25+</Text>
                <Text style={styles.statLabel}>Venues</Text>
              </View>
            </View>
          </View>
        );

      case "exclusive_offer":
        return (
          <View style={styles.exclusiveOffer}>
            <View style={styles.exclusiveContent}>
              <MaterialIcons name="diamond" size={40} color="#EC4899" />
              <Text style={styles.exclusiveTitle}>{item.title}</Text>
              <Text style={styles.exclusiveSubtitle}>{item.subtitle}</Text>
              <Text style={styles.exclusiveDescription}>
                {item.description}
              </Text>
              <TouchableOpacity style={styles.exclusiveButton}>
                <Text style={styles.exclusiveButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <FlatList
        data={contentData}
        renderItem={renderContent}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        onEndReached={loadMoreContent}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#EC4899" />
              <Text style={styles.loadingText}>Loading more venues...</Text>
            </View>
          ) : (
            <View style={{ height: 100 }} />
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: StatusBar.currentHeight || 0,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "NeuePlakExtendedBlack",
  },
  logoPink: {
    color: "#EC4899",
  },
  searchWrapper: {
    flexDirection: "row",
    backgroundColor: "#111",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 24,
    borderRadius: 14,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
  heroContainer: {
    marginBottom: 20,
  },
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 30,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 30,
  },
  heroTextWrapper: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  heroTitle: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "NeuePlakExtendedBlack",
  },
  heroSub: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
    fontFamily: "Montserrat-Light",
  },
  logoTextexc: {
    color: "#fff",
    fontFamily: "NeuePlakExtendedBlack",
  },
  logoPinkexc: {
    color: "#EC4899",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginTop: 30,
    marginBottom: 15,
  },
  // Large Cards
  largeCardsContainer: {
    gap: 20,
  },
  largeClubCard: {
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 15,
  },
  largeClubImage: {
    width: "100%",
    height: "100%",
  },
  largeClubOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  largeClubInfo: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  largeClubName: {
    fontSize: 24,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 4,
  },
  largeClubDesc: {
    fontSize: 14,
    fontFamily: "Montserrat-Light",
    color: "#ccc",
    marginBottom: 8,
  },
  largeClubMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  largeClubLocation: {
    fontSize: 12,
    fontFamily: "Montserrat-Light",
    color: "#ccc",
  },
  // Grid Cards
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  gridClubCard: {
    width: (width - 55) / 2,
    height: 150,
    borderRadius: 15,
    overflow: "hidden",
  },
  gridClubImage: {
    width: "100%",
    height: "100%",
  },
  gridClubOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  gridClubInfo: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  gridClubName: {
    fontSize: 14,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 2,
  },
  gridClubLocation: {
    fontSize: 10,
    fontFamily: "Montserrat-Light",
    color: "#ccc",
    marginBottom: 4,
  },
  gridRatingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EC4899",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: "flex-start",
    gap: 2,
  },
  gridRatingText: {
    fontSize: 10,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
  // Horizontal Cards
  horizontalScrollContainer: {
    paddingRight: 20,
    gap: 15,
  },
  horizontalClubCard: {
    width: 120,
    height: 120,
    borderRadius: 15,
    overflow: "hidden",
  },
  horizontalClubImage: {
    width: "100%",
    height: "100%",
  },
  horizontalClubOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  horizontalClubInfo: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
  },
  horizontalClubName: {
    fontSize: 12,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 4,
  },
  horizontalRatingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EC4899",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    alignSelf: "flex-start",
    gap: 2,
  },
  horizontalRatingText: {
    fontSize: 9,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
  // Promotional Ad
  promotionalAd: {
    height: 160,
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 20,
    borderWidth: 2,
  },
  adImage: {
    width: "100%",
    height: "100%",
  },
  adOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  adContent: {
    position: "absolute",
    top: 15, // Reduced from 20
    left: 20,
    right: 20,
    bottom: 15, // Reduced from 20 to give more space
  },
  adBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 8, // Reduced from 10
  },
  adBadgeText: {
    fontSize: 10,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  adTitle: {
    fontSize: 20, // Reduced from 22
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 3, // Reduced from 4
  },
  adSubtitle: {
    fontSize: 14, // Reduced from 16
    fontFamily: "Montserrat-Bold",
    color: "#fff",
    marginBottom: 3, // Reduced from 4
  },
  adDescription: {
    fontSize: 11, // Reduced from 12
    fontFamily: "Montserrat-Light",
    color: "#fff",
    marginBottom: 12, // Reduced from 15
  },
  adButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start",
    gap: 4,
    position: "absolute", // Position it absolutely
    bottom: 0, // Stick to bottom of content area
    left: 0, // Align to left
  },
  adButtonText: {
    fontSize: 12,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  // Category Section
  categorySection: {
    marginVertical: 10,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  categoryCard: {
    width: (width - 55) / 2,
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
    marginTop: 8,
  },
  // Stats Section
  statsSection: {
    marginVertical: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statCard: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#EC4899",
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Montserrat-Light",
    color: "#ccc",
    marginTop: 4,
  },
  // Exclusive Offer
  exclusiveOffer: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 25,
    marginVertical: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#EC4899",
  },
  exclusiveContent: {
    alignItems: "center",
  },
  exclusiveTitle: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginTop: 15,
    marginBottom: 5,
    textAlign: "center",
  },
  exclusiveSubtitle: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: "#EC4899",
    marginBottom: 10,
    textAlign: "center",
  },
  exclusiveDescription: {
    fontSize: 14,
    fontFamily: "Montserrat-Light",
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  exclusiveButton: {
    backgroundColor: "#EC4899",
    borderRadius: 999,
    paddingHorizontal: 25,
    paddingVertical: 12,
    alignSelf: "center",
    minWidth: 120,
    alignItems: "center",
  },
  exclusiveButtonText: {
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
    textAlign: "center",
  },
  // Common
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EC4899",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
  // Loading
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  loadingText: {
    fontSize: 14,
    fontFamily: "Montserrat-Light",
    color: "#999",
    marginTop: 10,
  },
});
