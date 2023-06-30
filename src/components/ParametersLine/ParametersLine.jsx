import colors from "../../../colors";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function ParametersLine({
  icon,
  topic,
  colorText,
  handlePress
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.contentContainer} onPress={handlePress}>
        <View style={styles.topicContainer}>
          {icon && <Image source={icon} style={styles.icon} />}
          <Text style={{ color: colorText }}>{topic}</Text>
        </View>
        <Image
          source={require("../../../assets/images/static/right-arrow.png")}
          style={styles.rightArrow}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topicContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  rightArrow: {
    width: 24,
    height: 24,
  },
});
