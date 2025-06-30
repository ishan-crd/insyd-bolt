import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// File should be named: [category].js in your app directory
// File should be named: [category].js in your app directory
export default function CategoryClubs() {
  const router = useRouter();
  const { category } = useLocalSearchParams();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Category mapping for display
  const categoryMap = {
    rooftop: { name: "Rooftop", color: "#EC4899", icon: "apartment" },
    lounge: { name: "Lounge", color: "#8B5CF6", icon: "weekend" },
    dance: { name: "Dance", color: "#F59E0B", icon: "music-note" },
    premium: { name: "Premium", color: "#10B981", icon: "star" },
  };

  const currentCategory = categoryMap[category] || categoryMap.rooftop;

  // Extended club database with categories
  const allClubs = [
    // Rooftop Clubs
    {
      id: 1,
      name: "Privee",
      location: "Vasant Kunj, Delhi",
      rating: "4.8",
      image: require("../assets/images/restaurantkitty.png"),
      type: "premium",
      category: "rooftop",
      description: "Exclusive rooftop experience with panoramic city views",
      priceRange: "₹2500-4000",
      features: ["Open Sky", "City View", "Premium Bar"],
    },
    {
      id: 5,
      name: "Sky Lounge",
      location: "Connaught Place, Delhi",
      rating: "4.6",
      image: require("../assets/images/clubbw.png"),
      type: "rooftop",
      category: "rooftop",
      description: "Stunning rooftop bar with signature cocktails",
      priceRange: "₹2000-3500",
      features: ["Rooftop Bar", "Live Music", "Cocktails"],
    },
    {
      id: 6,
      name: "High Ultra Lounge",
      location: "Hauz Khas, Delhi",
      rating: "4.7",
      image: require("../assets/images/whiteclub.png"),
      type: "rooftop",
      category: "rooftop",
      description: "Ultra-modern rooftop with DJ nights",
      priceRange: "₹3000-5000",
      features: ["DJ Nights", "Premium Seating", "City Lights"],
    },
    {
      id: 7,
      name: "Terrace Grill",
      location: "Sector 29, Gurgaon",
      rating: "4.4",
      image: require("../assets/images/playboy.jpg"),
      type: "rooftop",
      category: "rooftop",
      description: "Rooftop dining with live grills and music",
      priceRange: "₹1800-3000",
      features: ["Live Grill", "Open Terrace", "Music"],
    },

    // Lounge Clubs
    {
      id: 3,
      name: "Club BW",
      location: "Vasant Kunj, Delhi",
      rating: "4.5",
      image: require("../assets/images/clubbw.png"),
      type: "lounge",
      category: "lounge",
      description: "Sophisticated nightlife with elegant ambiance",
      priceRange: "₹2000-3500",
      features: ["Elegant Decor", "Wine Selection", "Intimate Setting"],
    },
    {
      id: 8,
      name: "Velvet Lounge",
      location: "Khan Market, Delhi",
      rating: "4.3",
      image: require("../assets/images/restaurantkitty.png"),
      type: "lounge",
      category: "lounge",
      description: "Luxurious lounge with premium spirits",
      priceRange: "₹2200-4000",
      features: ["Premium Spirits", "Luxury Decor", "VIP Seating"],
    },
    {
      id: 9,
      name: "Amber Lounge",
      location: "Cyber City, Gurgaon",
      rating: "4.5",
      image: require("../assets/images/whiteclub.png"),
      type: "lounge",
      category: "lounge",
      description: "Chic lounge with craft cocktails",
      priceRange: "₹1900-3200",
      features: ["Craft Cocktails", "Chic Ambiance", "Live Jazz"],
    },
    {
      id: 10,
      name: "Crimson Lounge",
      location: "CP, Delhi",
      rating: "4.2",
      image: require("../assets/images/playboy.jpg"),
      type: "lounge",
      category: "lounge",
      description: "Intimate lounge with signature mixology",
      priceRange: "₹2100-3800",
      features: ["Signature Cocktails", "Intimate Vibe", "Mixology"],
    },

    // Dance Clubs
    {
      id: 2,
      name: "PlayBoy",
      location: "Delhi NCR",
      rating: "4.5",
      image: require("../assets/images/playboy.jpg"),
      type: "party",
      category: "dance",
      description: "Ultimate party destination with top DJs",
      priceRange: "₹1500-3000",
      features: ["Top DJs", "Dance Floor", "Party Vibes"],
    },
    {
      id: 11,
      name: "Pulse",
      location: "Sector 29, Gurgaon",
      rating: "4.6",
      image: require("../assets/images/clubbw.png"),
      type: "dance",
      category: "dance",
      description: "High-energy dance club with EDM beats",
      priceRange: "₹1800-3500",
      features: ["EDM Music", "Light Shows", "Large Dance Floor"],
    },
    {
      id: 12,
      name: "Groove",
      location: "Hauz Khas Village, Delhi",
      rating: "4.4",
      image: require("../assets/images/restaurantkitty.png"),
      type: "dance",
      category: "dance",
      description: "Underground dance club with unique sound",
      priceRange: "₹1200-2500",
      features: ["Underground Vibe", "Unique Sound", "Late Night"],
    },
    {
      id: 13,
      name: "Beat Drop",
      location: "Nehru Place, Delhi",
      rating: "4.3",
      image: require("../assets/images/whiteclub.png"),
      type: "dance",
      category: "dance",
      description: "Popular dance destination for youth",
      priceRange: "₹1000-2200",
      features: ["Youth Crowd", "Popular Music", "Affordable"],
    },

    // Premium Clubs
    {
      id: 4,
      name: "White Club",
      location: "New Delhi, Delhi",
      rating: "4.1",
      image: require("../assets/images/whiteclub.png"),
      type: "elegant",
      category: "premium",
      description: "Refined elegance with exclusive membership",
      priceRange: "₹3500-6000",
      features: ["Exclusive Access", "Premium Service", "Elegant Design"],
    },
    {
      id: 14,
      name: "Diamond Club",
      location: "Golf Course Road, Gurgaon",
      rating: "4.9",
      image: require("../assets/images/playboy.jpg"),
      type: "premium",
      category: "premium",
      description: "Ultra-premium club with world-class amenities",
      priceRange: "₹5000-8000",
      features: ["World Class", "VIP Treatment", "Exclusive Events"],
    },
    {
      id: 15,
      name: "Platinum Lounge",
      location: "Aerocity, Delhi",
      rating: "4.8",
      image: require("../assets/images/clubbw.png"),
      type: "premium",
      category: "premium",
      description: "Premium destination for elite clientele",
      priceRange: "₹4000-7000",
      features: ["Elite Clientele", "Premium Amenities", "Exclusive"],
    },
    {
      id: 16,
      name: "Royal Club",
      location: "Chanakyapuri, Delhi",
      rating: "4.7",
      image: require("../assets/images/restaurantkitty.png"),
      type: "premium",
      category: "premium",
      description: "Royal treatment with luxury at its finest",
      priceRange: "₹4500-7500",
      features: ["Royal Treatment", "Luxury Service", "Premium Bar"],
    },
  ];

  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = () => {
    setLoading(true);

    // Filter clubs by category
    const filteredClubs = allClubs.filter((club) => club.category === category);

    // Simulate API call delay
    setTimeout(() => {
      setClubs(filteredClubs.slice(0, 6)); // Load first 6 clubs
      setLoading(false);
    }, 1000);
  };

  const loadMoreClubs = () => {
    if (loadingMore) return;

    setLoadingMore(true);
    const filteredClubs = allClubs.filter((club) => club.category === category);
    const currentLength = clubs.length;

    setTimeout(() => {
      const newClubs = filteredClubs.slice(currentLength, currentLength + 4);
      setClubs((prev) => [...prev, ...newClubs]);
      setLoadingMore(false);
      setPage((prev) => prev + 1);
    }, 800);
  };

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
        clubPriceRange: club.priceRange,
        clubFeatures: JSON.stringify(club.features),
      },
    });
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "rooftop":
        return "apartment";
      case "lounge":
        return "weekend";
      case "dance":
        return "music-note";
      case "premium":
        return "star";
      default:
        return "place";
    }
  };

  const renderClubCard = ({ item: club }) => (
    <TouchableOpacity
      style={styles.clubCard}
      onPress={() => handleClubPress(club)}
    >
      <Image source={club.image} style={styles.clubImage} />
      <View style={styles.clubOverlay} />

      {/* Category Badge */}
      <View
        style={[
          styles.categoryBadge,
          { backgroundColor: currentCategory.color },
        ]}
      >
        <MaterialIcons name={currentCategory.icon} size={12} color="#fff" />
        <Text style={styles.categoryBadgeText}>
          {currentCategory.name.toUpperCase()}
        </Text>
      </View>

      {/* Rating Badge */}
      <View style={styles.ratingBadge}>
        <MaterialIcons name="star" size={14} color="#fff" />
        <Text style={styles.ratingText}>{club.rating}</Text>
      </View>

      <View style={styles.clubInfo}>
        <Text style={styles.clubName}>{club.name}</Text>
        <Text style={styles.clubDescription}>{club.description}</Text>

        <View style={styles.clubMeta}>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={14} color="#EC4899" />
            <Text style={styles.clubLocation}>{club.location}</Text>
          </View>
          <Text style={styles.priceRange}>{club.priceRange}</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          {club.features.slice(0, 3).map((feature, index) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.headerContent}>
        <View
          style={[
            styles.headerIcon,
            { backgroundColor: currentCategory.color },
          ]}
        >
          <MaterialIcons name={currentCategory.icon} size={32} color="#fff" />
        </View>
        <Text style={styles.headerTitle}>{currentCategory.name} Clubs</Text>
        <Text style={styles.headerSubtitle}>
          Discover the best {currentCategory.name.toLowerCase()} experiences in
          Delhi NCR
        </Text>
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{clubs.length}+</Text>
        <Text style={styles.statLabel}>Venues</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>4.5★</Text>
        <Text style={styles.statLabel}>Avg Rating</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>2K+</Text>
        <Text style={styles.statLabel}>Reviews</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EC4899" />
          <Text style={styles.loadingText}>
            Loading {currentCategory.name} clubs...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <FlatList
        data={clubs}
        renderItem={renderClubCard}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            {renderHeader()}
            {renderStats()}
            <Text style={styles.sectionTitle}>
              All {currentCategory.name} Venues
            </Text>
          </>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        onEndReached={loadMoreClubs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loadingMore ? (
            <View style={styles.loadingMoreContainer}>
              <ActivityIndicator size="small" color="#EC4899" />
              <Text style={styles.loadingMoreText}>Loading more venues...</Text>
            </View>
          ) : (
            <View style={styles.footerSpace} />
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
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "Montserrat-Light",
    color: "#999",
    marginTop: 15,
  },
  headerContainer: {
    marginBottom: 25,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerContent: {
    alignItems: "center",
  },
  headerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "Montserrat-Light",
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#EC4899",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Montserrat-Light",
    color: "#999",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 20,
  },
  clubCard: {
    backgroundColor: "#111",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
  },
  clubImage: {
    width: "100%",
    height: 200,
  },
  clubOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: 200,
  },
  categoryBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  ratingBadge: {
    position: "absolute",
    top: 15,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EC4899",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  clubInfo: {
    padding: 20,
  },
  clubName: {
    fontSize: 22,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 6,
  },
  clubDescription: {
    fontSize: 14,
    fontFamily: "Montserrat-Light",
    color: "#ccc",
    marginBottom: 15,
  },
  clubMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  clubLocation: {
    fontSize: 12,
    fontFamily: "Montserrat-Light",
    color: "#ccc",
  },
  priceRange: {
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
    color: "#EC4899",
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featureTag: {
    backgroundColor: "#222",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  featureText: {
    fontSize: 11,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
  loadingMoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 10,
  },
  loadingMoreText: {
    fontSize: 14,
    fontFamily: "Montserrat-Light",
    color: "#999",
  },
  footerSpace: {
    height: 20,
  },
});
