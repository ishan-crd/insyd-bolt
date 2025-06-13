import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.boxforSroll}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Find clubs nearby"
          placeholderTextColor="#999"
        />
        <Feather
          name="search"
          size={17}
          color="#999"
          style={styles.searchIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 5,
    marginHorizontal: 16,
    position: "relative",
  },
  searchInput: {
    height: 42,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 5.3,
    elevation: 4,
    fontFamily: "Montserrat-Medium",
  },
  searchIcon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  boxforSroll: {
    backgroundColor: "white",
    height: 67,
    borderCurve: 20,
    borderColor: "rgba(0, 0, 0, 0.08)",
  },
});
