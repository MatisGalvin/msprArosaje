import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../colors";

export const LargeButton = ({ children, image, handlePress = () => {} }) => {
  return (
    <TouchableOpacity style={s.container} onPress={handlePress}>
      <Image style={s.sizeImg} source={image} />
      <Text style={s.textBtn}>{children}</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.green[400],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 8,
    borderRadius: 6,
  },
  textBtn: {
    color: colors.gray[600],
    fontWeight: "bold",
  },
  sizeImg: {
    height: 12,
    width: 12,
  },
});
