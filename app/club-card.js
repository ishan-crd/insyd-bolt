import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const { width } = Dimensions.get("window");

const BookingRoute = () => <View style={{ flex: 1 }} />;

const DrinksRoute = () => <View style={{ flex: 1 }} />;

const MenuRoute = () => <View style={{ flex: 1 }} />;

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "booking", title: "Booking" },
    { key: "drinks", title: "Drinks" },
    { key: "menu", title: "Menu" },
  ]);

  const renderScene = SceneMap({
    booking: BookingRoute,
    drinks: DrinksRoute,
    menu: MenuRoute,
  });

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Header Image and Info Section */}
          <View style={styles.headerContainer}>
            <Image
              source={require("../assets/images/clubbw.png")}
              style={styles.headerImage}
            />

            {/* Club Info */}
            <View style={styles.clubInfo}>
              <View>
                <Text style={styles.clubName}>Privee</Text>
                <Text style={styles.location}>Delhi NCR</Text>
              </View>

              <View style={styles.ratingBadge}>
                <AntDesign name="star" size={16} color="white" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width }}
              style={styles.tabView}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  style={styles.tabBar}
                  indicatorStyle={styles.tabIndicator}
                  labelStyle={styles.tabLabel}
                  activeColor="#000"
                  inactiveColor="#7d7979"
                />
              )}
            />
          </View>

          {/* Promotion Card */}
          <View style={styles.promoCard}>
            <View>
              <Text style={styles.promoTitle}>FLAT 25% OFF</Text>
              <Text style={styles.promoSubtitle}>Limited Slots Left</Text>
            </View>

            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add to Ticket</Text>
            </TouchableOpacity>

            <View style={styles.slotsContainer}>
              <Text style={styles.slotsText}>Only 25 Slots Available</Text>
            </View>
          </View>

          {/* Menu Section */}
          <View style={styles.menuSection}>
            <Text style={styles.menuTitle}>Menu</Text>
            <View style={styles.menuImages}>
              <Image
                source={require("../assets/images/clubbw.png")}
                style={styles.menuImage}
              />
              <Image
                source={require("../assets/images/clubbw.png")}
                style={styles.menuImage}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.favoriteButton}>
              <Text style={styles.favoriteButtonText}>Add to Favourites</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ticketButton}>
              <Text style={styles.ticketButtonText}>Add to Ticket</Text>
              <Text style={styles.ticketButtonSubtext}>Tap to view offers</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "black",
  },
  headerContainer: {
    height: 380,
  },
  headerImage: {
    width: "100%",
    height: 404,
  },
  clubInfo: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 13,
    bottom: 15,
    left: 0,
    right: 0,
  },
  clubName: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "600",
    fontSize: 36,
    color: "white",
  },
  location: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "500",
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  ratingBadge: {
    backgroundColor: "#e91174",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  ratingText: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "500",
    color: "white",
    fontSize: 14,
  },
  tabContainer: {
    height: 60,
    marginTop: 0,
    zIndex: 1,
  },
  tabView: {
    height: 60,
  },
  tabBar: {
    top: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 23,
    marginHorizontal: 43,
    height: 45,
    padding: 0,
    justifyContent: "center",
  },
  tabIndicator: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#e91174",
    borderRadius: 23,
    height: "100%",
  },
  tabLabel: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "500",
    fontSize: 13,
    textTransform: "none",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  promoCard: {
    backgroundColor: "#fdbedb",
    borderRadius: 30,
    marginHorizontal: 21,
    marginTop: 26,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 14.5,
    elevation: 5,
  },
  promoTitle: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "600",
    fontSize: 18,
    color: "black",
  },
  promoSubtitle: {
    fontFamily: "Montserrat-Medium",
    fontSize: 11.1,
    color: "black",
    marginTop: 2,
  },
  addButton: {
    position: "absolute",
    right: 25,
    top: 19,
    backgroundColor: "black",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  addButtonText: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "600",
    color: "white",
    fontSize: 10,
  },
  slotsContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginTop: 10,
    paddingVertical: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 9.2,
    elevation: 3,
  },
  slotsText: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "600",
    fontSize: 10,
    color: "black",
  },
  menuSection: {
    marginHorizontal: 40,
    marginTop: 16,
  },
  menuTitle: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 15,
    color: "black",
    marginLeft: 9,
  },
  menuImages: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
  },
  menuImage: {
    width: 150,
    height: 147,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 51,
    marginTop: 37,
    padding: 11,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 18.9,
    elevation: 5,
  },
  favoriteButton: {
    borderWidth: 1,
    borderColor: "#e91174",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  favoriteButtonText: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "600",
    fontSize: 11,
    color: "#e91174",
  },
  ticketButton: {
    backgroundColor: "#e91174",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
  },
  ticketButtonText: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "600",
    fontSize: 12,
    color: "white",
  },
  ticketButtonSubtext: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "500",
    fontSize: 8,
    color: "white",
  },
});
