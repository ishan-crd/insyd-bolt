import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>insyd</Text>
          <View style={[styles.dot, styles.whiteDot]} />
          <View style={[styles.dot, styles.pinkDot]} />
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.themeButton}>
            <MaterialIcons name="wb-sunny" size={24} color="#424242" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 0,
  },
  logoContainer: {
    height: 40,
    width: 100,

    alignItems: "center",
    position: "relative",
  },
  logoText: {
    color: "#424242",
    fontSize: 32,
    fontFamily: "Montserrat-SemiBold",
  },
  dot: {
    width: 10,
    height: 10,
    position: "absolute",
    top: 2,
    left: 5.5,
    borderRadius: 10,
  },
  whiteDot: {
    backgroundColor: "white",
  },
  pinkDot: {
    backgroundColor: "#e81174",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  themeButton: {
    padding: 8,
  },
  menuButton: {
    padding: 0,
  },
  menuLine: {
    width: 24,
    height: 4,
    backgroundColor: "#424242",
    borderRadius: 49,
    marginVertical: 2.2,
  },
});
