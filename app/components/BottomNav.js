import { Feather, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function () {
  return (
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
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    width: "90%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 53,
    paddingVertical: 21,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignSelf: "center",
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
