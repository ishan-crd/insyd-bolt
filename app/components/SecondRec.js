import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Rec({ recommendedClubs, text }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{text}</Text>
        <Feather name="chevron-right" size={24} color="#898686" />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {recommendedClubs.map((club) => (
          <Image
            key={club.id}
            source={{ uri: club.image }}
            style={styles.clubImage}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 15,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingRight: 20,
  },
  sectionTitle: {
    paddingLeft: 17,
    fontWeight: "600",
    color: "#424242",
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
  },
  clubImage: {
    width: 340,
    height: 130,
    marginRight: 14,
    borderRadius: 21,
    left: 12,
  },
  scrollContainer: {
    flexDirection: "row",
  },
});
