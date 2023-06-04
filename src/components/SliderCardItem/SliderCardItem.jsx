import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import colors from "../../../colors";

export const SliderCardItem = ({ image, date, owner }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.img} source={image} />
      <Text style={styles.date}>{date}</Text>
      {owner && (
        <Text style={{ fontWeight: "bold", marginTop: 8 }}>{owner}</Text>
      )}
      <View style={styles.row}>
        <Text>Commentaire</Text>
        <Image
          style={styles.arrow}
          source={require("../../../assets/images/static/arrow-right.png")}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: colors.white,
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  img: {
    height: 125,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    gap: 9,
  },
  date: {
    fontWeight: "bold",
    marginTop: 16,
  },
  arrow: {
    height: 7,
    width: 11,
    resizeMode: "contain",
  },
});
