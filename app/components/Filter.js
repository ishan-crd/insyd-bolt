import { Feather, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Filter() {
  return (
    <View style={styles.filterSection}>
      <TouchableOpacity style={styles.filterButton}>
        <Feather name="filter" size={14} color="#000" />
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
        <Text style={[styles.filterText, styles.activeText]}>Near</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>Rating</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>Offers</Text>
      </TouchableOpacity>

      <View style={styles.sortContainer}>
        <Text style={styles.sortText}>Sort</Text>
        <MaterialIcons name="swap-vert" size={14} color="#C0C0C0" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterSection: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginRight: 8,
  },
  activeFilter: {
    borderColor: "#000",
  },
  activeText: {
    fontFamily: "Montserrat-SemiBold",
  },
  filterText: {
    fontSize: 12,
    marginLeft: 4,
    fontFamily: "Montserrat-Medium",
  },
  sortContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
});
