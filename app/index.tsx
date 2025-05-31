import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import ImageCarousel from "./components/ImageCarousel";
import Rec from "./components/Rec";
import SearchBar from "./components/SearchBar";

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const carouselImages = [
    "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg",
    "https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg",
    "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg",
    "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg",
    "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg",
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <SearchBar />
        <ImageCarousel images={carouselImages} />
        <Rec recommendedClubs={recommendedClubs} text="Recommended Clubs" />
        <Rec recommendedClubs={recommendedClubs} text="Previously Visited" />
        <Rec recommendedClubs={recommendedClubs} text="Upcoming Parties" />
        <Rec recommendedClubs={recommendedClubs} text="Recommended Clubs" />
        <Rec recommendedClubs={recommendedClubs} text="Previously Visited" />
        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight || 0,
  },
  scrollContainer: {
    paddingBottom: 120,
  },
  mainBanner: {
    alignSelf: "center",
    width: "90%",
    height: 195,
    marginTop: 28,
    borderRadius: 22,
  },
});
