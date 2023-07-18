import { StyleSheet, Text, View } from "react-native";
import colors from "../../../colors";
import { SquircleView } from "react-native-figma-squircle";

export default function MessageBubble({ children, isMine }) {
  return (
    <SquircleView
      style={[styles.container, {
        alignSelf: (isMine ? "flex-end" : "flex-start")
      }]}
      squircleParams={{
        cornerSmoothing: 0.6,
        cornerRadius: 18,
        fillColor: (isMine ? colors.green[400] : colors.gray[200]),
      }}
    >
      <Text style={{ color: (isMine ? colors.white : colors.gray[600]) }}>{children}</Text>
    </SquircleView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    maxWidth: 240,
  }
});