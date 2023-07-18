import { StyleSheet, Text, View } from "react-native";
import colors from "../../../colors";
import { SquircleView } from "react-native-figma-squircle";

export default function MyMessage({ children }) {
  return (
    <SquircleView
      style={styles.container}
      squircleParams={{
        cornerSmoothing: 0.6,
        cornerRadius: 18,
        fillColor: colors.green[400],
      }}
    >
      <Text style={styles.textMessage}>{children}</Text>
    </SquircleView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    maxWidth: 240,
    alignSelf: "flex-end"
  },
  textMessage: {
    color: colors.white,
  },
});
