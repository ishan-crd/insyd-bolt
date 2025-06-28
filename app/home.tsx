import { MaterialIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import {
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

const router = useRouter();
SplashScreen.preventAutoHideAsync();

export default function Home() {
  const featuredClubs = [
    {
      id: 1,
      name: "Privee",
      location: "Vasant Kunj, Delhi",
      rating: "4.8",
      image: require("../assets/images/restaurantkitty.png"),
    },
    {
      id: 2,
      name: "PlayBoy",
      location: "Delhi NCR",
      rating: "4.5",
      image: require("../assets/images/playboy.jpg"),
    },
    {
      id: 3,
      name: "Club BW",
      location: "Vasant Kunj, Delhi",
      rating: "4.5",
      image: require("../assets/images/clubbw.png"),
    },
    {
      id: 4,
      name: "White Club",
      location: "New Delhi, Delhi",
      rating: "4.1",
      image: require("../assets/images/whiteclub.png"),
    },
  ];
  const carouselImages = [
    require("../assets/images/whiteclub.png"),
    require("../assets/images/clubbw.png"),
    require("../assets/images/playboy.jpg"),
    require("../assets/images/restaurantkitty.png"),
    require("../assets/images/whiteclub.png"),
  ];

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const recommendedClubs = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg",
    },
  ];

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
          "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
          "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
          "NeuePlakExtendedBlack": require("../assets/fonts/NeuePlakExtendedBlack.ttf"),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.warn("Error loading fonts:", error);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerWrapper}>
          <Text style={styles.logoText}><Text style={styles.logoPink}>in</Text>syd</Text>
          <TouchableOpacity onPress={() => router.push("/ticket")}>
            <MaterialIcons name="local-activity" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
          <TouchableOpacity>
            <MaterialIcons name="filter-list" size={26} color="#999" />

          </TouchableOpacity>
        </View>

       <Image source={require("../assets/images/playboy.jpg")} style={styles.heroImage} />
       <View style={styles.imageOverlay} />

        <View style={styles.heroTextWrapper}>
          <Text style={styles.heroTitle}>Playboy</Text>
          <Text style={styles.heroSub}><Text style={styles.logoTextexc}><Text style={styles.logoPinkexc}>in</Text>syd</Text> Exclusive</Text>
        </View>

        <Text style={styles.sectionTitle}>Featured Clubs</Text>
        <Featured featuredClubs={featuredClubs.slice(0, 2)} onPress={() => router.push("/club-card")} />

        <Text style={styles.sectionTitle}>Other Clubs</Text>
        <Featured featuredClubs={featuredClubs.slice(2)} onPress={() => router.push("/club-card")} />

        <View style={{ height: 100 }} />
      </ScrollView>
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
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  logoTextexc: {
    color: "#fff",
    fontFamily: "NeuePlakExtendedBlack",
  },
  logoPinkexc: {
    color: "#EC4899",
  },
  searchWrapper: {
    flexDirection: "row",
    backgroundColor: "#111",
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 24,
    borderRadius:14,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  heroImage: {
    width: "100%",
    height: 180,
    borderRadius: 20,
    marginBottom: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 30,
  },
  heroTextWrapper: {
    position: "absolute",
    top: 270,
    left: 35,
  },
  heroTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "NeuePlakExtendedBlack"
  },
  heroSub: {
    color: "#fff",
    fontSize: 14,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "NeuePlakExtendedBlack",
    color: "#fff",
    marginTop: 30,
    marginBottom: 5,
  },
});
