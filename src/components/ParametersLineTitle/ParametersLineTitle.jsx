import { Text, View, StyleSheet } from "react-native";
import colors from "../../../colors";

export default function ParametersLineTitle({ style, text }) {
  return (
    <View style={[style, styles.container]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      paddingHorizontal: 20,
      paddingVertical: 5,
    },
    text: {
        fontWeight: "700",
        color: colors.gray[600],
    }
  });