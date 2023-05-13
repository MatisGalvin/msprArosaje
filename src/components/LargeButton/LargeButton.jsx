import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../colors";

export const LargeButton = ({ children, image, handlePress = () => {} , dark = false}) => {
  return (
    <TouchableOpacity style={[s.container, dark && s.containerDark]} onPress={handlePress}>
      <Image style={s.sizeImg} source={image} />
      <Text style={[s.textBtn, dark && s.textBtnDark]}>{children}</Text>
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
  containerDark: {
    backgroundColor: colors.gray[600]
  },
  textBtn: {
    color: colors.gray[600],
    fontWeight: "bold",
  },
  textBtnDark: {
    color: colors.white
  },
  sizeImg: {
    height: 16,
    width: 16,
  },
});
