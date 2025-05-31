import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import Rec from "./components/Rec";
import SearchBar from "./components/SearchBar";
SplashScreen.preventAutoHideAsync();

export default function index() {
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
        // Hide splash screen once fonts are loaded (or failed to load)
        await SplashScreen.hideAsync();
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading component
  }

  return (
    <View style={styles.view}>
      <Header />
      <SearchBar />
      <Image
        source={{
          uri: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg",
        }}
        style={styles.mainBanner}
      />
      <Rec recommendedClubs={recommendedClubs} />
      <Rec recommendedClubs={recommendedClubs} />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "white",
  },
  mainBanner: {
    alignSelf: "center",
    width: "90%",
    height: 195,
    marginTop: 28,
    borderRadius: 22,
  },
});
