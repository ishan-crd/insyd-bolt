import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // All clubs database
  const allClubs = [
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
      tags: ["rooftop", "premium", "exclusive", "views", "bar"],
    },
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
      tags: ["dance", "party", "dj", "music", "nightlife"],
    },
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
      tags: ["lounge", "elegant", "wine", "sophisticated", "intimate"],
    },
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
      tags: ["premium", "elegant", "exclusive", "membership", "luxury"],
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
      tags: ["rooftop", "cocktails", "bar", "live music", "drinks"],
    },
    {
      id: 6,
      name: "Pulse",
      location: "Sector 29, Gurgaon",
      rating: "4.6",
      image: require("../assets/images/restaurantkitty.png"),
      type: "dance",
      category: "dance",
      description: "High-energy dance club with EDM beats",
      priceRange: "₹1800-3500",
      features: ["EDM Music", "Light Shows", "Large Dance Floor"],
      tags: ["dance", "edm", "electronic", "lights", "energy"],
    },
  ];

  // Filter options
  const filterOptions = [
    { id: "rooftop", label: "Rooftop", icon: "apartment", color: "#EC4899" },
    { id: "lounge", label: "Lounge", icon: "weekend", color: "#8B5CF6" },
    { id: "dance", label: "Dance", icon: "music-note", color: "#F59E0B" },
    { id: "premium", label: "Premium", icon: "star", color: "#10B981" },
    {
      id: "live-music",
      label: "Live Music",
      icon: "library-music",
      color: "#06B6D4",
    },
    {
      id: "cocktails",
      label: "Cocktails",
      icon: "local-bar",
      color: "#F97316",
    },
  ];

  // Popular searches
  const popularSearches = [
    "Rooftop bars",
    "Dance clubs",
    "Live music",
    "Premium lounges",
    "Cocktail bars",
    "Party venues",
    "Weekend specials",
  ];

  useEffect(() => {
    // Animation on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Load recent searches (in real app, get from AsyncStorage)
    setRecentSearches(["Rooftop", "PlayBoy", "Premium clubs"]);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      performSearch();
    } else {
      setFilteredClubs([]);
    }
  }, [searchQuery, selectedFilters]);

  const performSearch = () => {
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      let results = allClubs.filter((club) => {
        const matchesQuery =
          club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          club.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          club.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          );

        const matchesFilters =
          selectedFilters.length === 0 ||
          selectedFilters.some(
            (filter) =>
              club.category === filter ||
              club.tags.includes(filter) ||
              club.type === filter
          );

        return matchesQuery && matchesFilters;
      });

      // Sort by relevance (exact matches first, then rating)
      results.sort((a, b) => {
        const aExact = a.name.toLowerCase().includes(searchQuery.toLowerCase());
        const bExact = b.name.toLowerCase().includes(searchQuery.toLowerCase());

        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;

        return parseFloat(b.rating) - parseFloat(a.rating);
      });

      setFilteredClubs(results);
      setLoading(false);
    }, 300);
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
  };

  const handleFilterToggle = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    );
  };

  const handleClubPress = (club) => {
    // Add to recent searches
    setRecentSearches((prev) => {
      const newRecent = [
        club.name,
        ...prev.filter((s) => s !== club.name),
      ].slice(0, 5);
      return newRecent;
    });

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

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
    searchInputRef.current?.focus();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredClubs([]);
    Keyboard.dismiss();
  };

  const renderClubCard = ({ item: club }) => (
    <TouchableOpacity
      style={styles.clubCard}
      onPress={() => handleClubPress(club)}
    >
      <Image source={club.image} style={styles.clubImage} />
      <View style={styles.clubOverlay} />

      <View style={styles.clubBadges}>
        <View style={styles.ratingBadge}>
          <MaterialIcons name="star" size={12} color="#fff" />
          <Text style={styles.ratingText}>{club.rating}</Text>
        </View>
        <View
          style={[
            styles.categoryBadge,
            {
              backgroundColor:
                filterOptions.find((f) => f.id === club.category)?.color ||
                "#EC4899",
            },
          ]}
        >
          <Text style={styles.categoryText}>{club.category.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.clubInfo}>
        <Text style={styles.clubName}>{club.name}</Text>
        <Text style={styles.clubDescription} numberOfLines={2}>
          {club.description}
        </Text>

        <View style={styles.clubMeta}>
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={14} color="#EC4899" />
            <Text style={styles.clubLocation}>{club.location}</Text>
          </View>
          <Text style={styles.priceRange}>{club.priceRange}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialIcons name="search-off" size={80} color="#333" />
      <Text style={styles.emptyTitle}>No venues found</Text>
      <Text style={styles.emptyDescription}>
        Try adjusting your search or filters to find what you're looking for
      </Text>
    </View>
  );

  const renderSearchSuggestions = () => (
    <View style={styles.suggestionsContainer}>
      {/* Recent Searches - Moved to top */}
      {recentSearches.length > 0 && (
        <View style={styles.suggestionSection}>
          <Text style={styles.suggestionTitle}>Recent Searches</Text>
          <View style={styles.suggestionTags}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionTag}
                onPress={() => handleQuickSearch(search)}
              >
                <MaterialIcons name="history" size={16} color="#999" />
                <Text style={styles.suggestionTagText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Featured Section */}
      <View style={styles.featuredSection}>
        <Text style={styles.featuredTitle}>Trending Tonight</Text>
        <View style={styles.featuredCards}>
          {allClubs.slice(0, 3).map((club) => (
            <TouchableOpacity
              key={club.id}
              style={styles.featuredCard}
              onPress={() => handleClubPress(club)}
            >
              <Image source={club.image} style={styles.featuredImage} />
              <View style={styles.featuredOverlay} />
              <View style={styles.featuredBadge}>
                <MaterialIcons name="trending-up" size={12} color="#fff" />
                <Text style={styles.featuredBadgeText}>HOT</Text>
              </View>
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName}>{club.name}</Text>
                <View style={styles.featuredRating}>
                  <MaterialIcons name="star" size={12} color="#EC4899" />
                  <Text style={styles.featuredRatingText}>{club.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Categories */}
      <View style={styles.quickCategoriesSection}>
        <Text style={styles.quickCategoriesTitle}>Quick Explore</Text>
        <View style={styles.quickCategories}>
          {filterOptions.slice(0, 4).map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.quickCategory, { borderColor: category.color }]}
              onPress={() => {
                setSelectedFilters([category.id]);
                setSearchQuery(category.label);
              }}
            >
              <View
                style={[
                  styles.quickCategoryIcon,
                  { backgroundColor: category.color },
                ]}
              >
                <MaterialIcons name={category.icon} size={20} color="#fff" />
              </View>
              <Text style={styles.quickCategoryText}>{category.label}</Text>
              <Text style={styles.quickCategoryCount}>
                {
                  allClubs.filter(
                    (club) =>
                      club.category === category.id ||
                      club.tags.includes(category.id)
                  ).length
                }{" "}
                venues
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Premium Section */}
      {/* <View style={styles.premiumSection}>
        <View style={styles.premiumHeader}>
          <MaterialIcons name="diamond" size={24} color="#EC4899" />
          <Text style={styles.premiumTitle}>insyd Premium</Text>
        </View>
        <Text style={styles.premiumDescription}>
          Get exclusive access to VIP events, priority booking, and member-only
          venues
        </Text>
        <TouchableOpacity style={styles.premiumButton}>
          <Text style={styles.premiumButtonText}>Explore Premium</Text>
          <MaterialIcons name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View> */}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View
            style={[
              styles.searchContainer,
              searchFocused && styles.searchContainerFocused,
            ]}
          >
            <MaterialIcons name="search" size={24} color="#999" />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search clubs, events, locations..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              autoFocus={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch}>
                <MaterialIcons name="clear" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.filterButton,
              showFilters && styles.filterButtonActive,
            ]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <MaterialIcons
              name="tune"
              size={24}
              color={showFilters ? "#EC4899" : "#fff"}
            />
            {selectedFilters.length > 0 && (
              <View style={styles.filterCount}>
                <Text style={styles.filterCountText}>
                  {selectedFilters.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Filters */}
        {showFilters && (
          <Animated.View style={styles.filtersContainer}>
            <Text style={styles.filtersTitle}>Filter by</Text>
            <View style={styles.filterOptions}>
              {filterOptions.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterOption,
                    selectedFilters.includes(filter.id) && {
                      backgroundColor: filter.color,
                      borderColor: filter.color,
                    },
                  ]}
                  onPress={() => handleFilterToggle(filter.id)}
                >
                  <MaterialIcons
                    name={filter.icon}
                    size={16}
                    color={
                      selectedFilters.includes(filter.id)
                        ? "#fff"
                        : filter.color
                    }
                  />
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedFilters.includes(filter.id) &&
                        styles.filterOptionTextActive,
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        )}

        {/* Results */}
        {searchQuery.length === 0 ? (
          renderSearchSuggestions()
        ) : loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#EC4899" />
            <Text style={styles.loadingText}>Searching venues...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredClubs}
            renderItem={renderClubCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resultsContainer}
            ListHeaderComponent={() =>
              filteredClubs.length > 0 ? (
                <Text style={styles.resultsHeader}>
                  Found {filteredClubs.length} venue
                  {filteredClubs.length !== 1 ? "s" : ""}
                </Text>
              ) : null
            }
            ListEmptyComponent={renderEmptyState}
          />
        )}
      </Animated.View>
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
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  searchContainerFocused: {
    borderColor: "#EC4899",
    backgroundColor: "#1a1a1a",
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  filterButtonActive: {
    backgroundColor: "#1a1a1a",
    borderWidth: 2,
    borderColor: "#EC4899",
  },
  filterCount: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#EC4899",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  filterCountText: {
    fontSize: 10,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  filtersContainer: {
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  filtersTitle: {
    fontSize: 16,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 15,
  },
  filterOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: "#333",
  },
  filterOptionText: {
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: "#ccc",
  },
  filterOptionTextActive: {
    color: "#fff",
  },
  suggestionsContainer: {
    flex: 1,
    paddingTop: 10,
  },
  featuredSection: {
    marginBottom: 35,
  },
  featuredTitle: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 15,
  },
  featuredCards: {
    flexDirection: "row",
    gap: 12,
  },
  featuredCard: {
    flex: 1,
    height: 120,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  featuredBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EC4899",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 3,
  },
  featuredBadgeText: {
    fontSize: 9,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  featuredInfo: {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
  },
  featuredName: {
    fontSize: 12,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 2,
  },
  featuredRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  featuredRatingText: {
    fontSize: 10,
    fontFamily: "Montserrat-Medium",
    color: "#fff",
  },
  quickCategoriesSection: {
    marginBottom: 35,
  },
  quickCategoriesTitle: {
    fontSize: 18,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 15,
  },
  quickCategories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickCategory: {
    width: (width - 64) / 2,
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  quickCategoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickCategoryText: {
    fontSize: 14,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 4,
  },
  quickCategoryCount: {
    fontSize: 11,
    fontFamily: "Montserrat-Light",
    color: "#999",
  },
  suggestionSection: {
    marginBottom: 30,
  },
  suggestionTitle: {
    fontSize: 16,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginBottom: 12,
  },
  suggestionTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  suggestionTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  suggestionTagText: {
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: "#ccc",
  },
  premiumSection: {
    backgroundColor: "linear-gradient(135deg, #1a1a1a 0%, #2a1a2a 100%)",
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EC4899",
    marginBottom: 20,
  },
  premiumHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  premiumTitle: {
    fontSize: 18,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
  },
  premiumDescription: {
    fontSize: 13,
    fontFamily: "Montserrat-Light",
    color: "#ccc",
    marginBottom: 15,
    lineHeight: 18,
  },
  premiumButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EC4899",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignSelf: "flex-start",
    gap: 6,
  },
  premiumButtonText: {
    fontSize: 12,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
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
  resultsContainer: {
    paddingBottom: 100,
  },
  resultsHeader: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: "#ccc",
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
    height: 180,
  },
  clubOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: 180,
  },
  clubBadges: {
    position: "absolute",
    top: 15,
    left: 15,
    right: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  categoryBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
  },
  clubInfo: {
    padding: 20,
  },
  clubName: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginBottom: 6,
  },
  clubDescription: {
    fontSize: 14,
    fontFamily: "Montserrat-Light",
    color: "#ccc",
    marginBottom: 12,
  },
  clubMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: "Montserrat-Light",
    color: "#999",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
