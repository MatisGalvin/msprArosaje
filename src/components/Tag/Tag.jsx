import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../../../colors";

export const Tag = ({ image, children, color = "green" }) => {
  return (
    <View
      style={[
        styles.body,
        {
          backgroundColor:
            color == "green" ? colors.green[400] : colors.red[500],
        },
      ]}
    >
      {image && <Image source={image} style={styles.image} />}
      <Text
        style={[
          styles.text,
          { color: color == "green" ? colors.gray[600] : colors.white },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    borderRadius: 9,
    gap: 6,
    padding: 4,
    paddingHorizontal: 5,
    alignSelf: "flex-start",

    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    width: 16,
    height: 16,
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
