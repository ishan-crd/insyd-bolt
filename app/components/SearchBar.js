import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Find clubs nearby"
        placeholderTextColor="#999"
      />
      <Feather name="search" size={17} color="#999" style={styles.searchIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 15,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10.3,
    elevation: 4,
    fontFamily: "Montserrat-Medium",
  },
  searchIcon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
});
