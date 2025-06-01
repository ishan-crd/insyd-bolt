import { Feather, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function FloatingBottomNav() {
  return (
    <View style={styles.floatingWrapper}>
      <View style={styles.bottomNav}>
        <View style={styles.navItem}>
          <MaterialIcons name="home" size={34} color="#000" />
        </View>
        <Feather name="search" size={30} color="#b9bcbe" />
        <MaterialIcons name="local-activity" size={30} color="#b9bcbe" />
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>IG</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingWrapper: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 100, // ensure it floats over other content
  },
  bottomNav: {
    width: "85%",
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    alignItems: "center",
  },
  avatar: {
    width: 35,
    height: 34,
    backgroundColor: "#2e9ff1",
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 19.2,
  },
});
