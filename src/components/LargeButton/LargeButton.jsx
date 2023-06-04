import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../colors";

export const LargeButton = ({ children, image, handlePress = () => {} , dark = false, grey = false}) => {
  return (
    <TouchableOpacity style={[s.container, dark && s.containerDark, grey && s.containerGrey]} onPress={handlePress}>
      <Image style={s.sizeImg} source={image} />
      <Text style={[s.textBtn, dark && s.textBtnDark, grey && s.textBtnGrey]}>{children}</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    minWidth: "100%",
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
  containerGrey: {
    backgroundColor: colors.gray[200]
  },
  textBtn: {
    color: colors.gray[600],
    fontWeight: "bold",
  },
  textBtnDark: {
    color: colors.white
  },
  textBtnGrey: {
    color: colors.gray[400]
  },
  sizeImg: {
    height: 16,
    width: 16,
  },
});
