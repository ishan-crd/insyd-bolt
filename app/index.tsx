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
import Featured from "./components/Featured";
import Filter from "./components/Filter";
import Header from "./components/Header";
import ImageCarousel from "./components/ImageCarousel";
import Rec from "./components/Rec";
import SearchBar from "./components/SearchBar";
import SecondRec from "./components/SecondRec";

SplashScreen.preventAutoHideAsync();

export default function index() {
  const featuredClubs = [
    {
      id: 1,
      name: "Privee",
      location: "Delhi NCR",
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
      location: "Delhi NCR",
      rating: "4.5",
      image: require("../assets/images/clubbw.png"),
    },
    {
      id: 4,
      name: "White Club",
      location: "Delhi NCR",
      rating: "4.1",
      image: require("../assets/images/whiteclub.png"),
    },
  ];
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
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <SearchBar />
        <ImageCarousel images={carouselImages} containerStyle={{}} />
        <Filter />
        <Rec
          recommendedClubs={recommendedClubs}
          text="What are you looking for?"
        />
        <SecondRec
          recommendedClubs={recommendedClubs}
          text="You need to go here."
        />
        <Rec recommendedClubs={recommendedClubs} text="Upcoming Parties" />
        <Featured featuredClubs={featuredClubs} />
        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: StatusBar.currentHeight || 0,
  },
  scrollContainer: {
    paddingBottom: 120,
  },
});
