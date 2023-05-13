import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import colors from "../../../colors";

export const AddNewReport = () => {
  return (
    <TouchableOpacity style={s.container}>
      <View style={s.addBtnContainer}>
        <Image
          style={s.img}
          source={require("../../../assets/images/static/plus.png")}
        />
      </View>
      <Text style={s.text}>Ajouter un nouveau rapport</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[600],
    borderRadius: 12,
    width: 160,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  addBtnContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 10,
    alignSelf: "center",
  },
  img: {
    backgroundColor: colors.green[400],
    borderWidth: 3,
    height: 30,
    width: 30,
    borderColor: colors.gray[600],
    borderRadius: 15,
  },
});
