import { StyleSheet, View } from "react-native";
import colors from "../../../colors";

export default function OnlineDot({customDotStylesheet}) {
  return (
    <View style={[styles.backgroundDot, customDotStylesheet]}>
      <View style={styles.foregroundDot} />
    </View>
  );
}
const styles = StyleSheet.create({
  backgroundDot: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    backgroundColor: colors.background,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  foregroundDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: colors.green[400],
  },
});
