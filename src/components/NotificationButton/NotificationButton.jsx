import { Text } from "react-native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../../../colors";

export const NotificationButton = ({ unread, handlePress = () => {} }) => {
  // TODO : Gérer l'ouverture de screen Notifications

  return (
    <TouchableOpacity style={styles.body} onPress={handlePress}>
      <Image
        source={require("../../../assets/images/static/bell.png")}
        style={styles.image}
      />
      {unread && (
        <View style={styles.unreadContainer}>
          <Text style={styles.unreadText}>{unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  body: {},
  image: {
    resizeMode: "contain",
    height: 20,
    width: 20,
  },
  unreadContainer: {
    position: "absolute",
    top: -2,
    right: -4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.gray[600],
    borderRadius: 999,
    height: 14,
    minWidth: 14,
    backgroundColor: colors.red[500],
  },
  unreadText: {
    color: colors.white,
    fontSize: 10,
    color: colors.white,
    fontWeight: "600",
  },
});
