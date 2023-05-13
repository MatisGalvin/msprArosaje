import { useState } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";

export default function PlantTypeSelector({style, typeSelected, setTypeSelected}) {

  return (
    <View style={[styles.container, style]}>
      <Pressable style={typeSelected === "plantes" ? styles.activeScreen : styles.unActiveScreen} onPress={() => setTypeSelected("plantes")}>
        <Text style={typeSelected === "plantes" ? styles.activeText : styles.unActiveText}>Mes plantes</Text>
      </Pressable>
      <Pressable style={typeSelected === "protégées" ? styles.activeScreen : styles.unActiveScreen} onPress={() => setTypeSelected("protégées")}>
        <Text style={typeSelected === "protégées" ? styles.activeText : styles.unActiveText}>Mes protégées</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F4F6",
    width: "100%",
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
  },
  activeScreen: {
    backgroundColor: "white",
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9,
  },
  unActiveScreen: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 9
  },
  activeText: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "600",
  },
  unActiveText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "600",
  },
});
