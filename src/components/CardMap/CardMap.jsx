import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import colors from "../../../colors";

export default function CardMap({ style, name, image, city }) {
  return (
    <View style={[styles.body, style]}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.contentSections}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.cityContainer}>
              <Image
                source={require("../../../assets/images/static/small-pin.png")}
                style={styles.smallPin}
              />
              <Text style={styles.city}>{city}</Text>
            </View>
          </View>
          <View style={[styles.contentSections, styles.seePlantSection]}>
            <TouchableOpacity style={styles.seePlantSection}>
              <Text style={styles.seePlantText}>Voir la plante</Text>
              <Image
                source={require("../../../assets/images/static/right-arrow-padd.png")}
                style={styles.rightArrow}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 12,

    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  container: {
    alignSelf: "stretch",
    gap: 16,
  },
  image: {
    alignSelf: "stretch",
    width: "100%",
    height: undefined,
    aspectRatio: 1.8,
    borderRadius: 6,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentSections: {
    width: "50%",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[600],
  },
  cityContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 7,
  },
  smallPin: {
    width: 19,
    height: 19,
  },
  city: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.gray[600],
    borderColor: "red",
  },
  seePlantSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rightArrow: {
    width: 24,
    height: 24,
  },
  seePlantText: {
    fontSize: 12,
    fontWeight: "400",
    marginLeft: 25,
  },
});
