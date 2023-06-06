import { Image, StyleSheet, TouchableHighlight, View } from "react-native";
import colors from "../../../colors";

export const HeaderLogo = ({ screenName, handlePress }) => {
  const renderIconHeader = () => {
    switch (screenName) {
      case "Accueil":
        return require("../../../assets/images/static/house.png");
        break;

      case "Plantes":
        return require("../../../assets/images/static/plant.png");
        break;

      case "Analyse":
        return require("../../../assets/images/static/bottomBar/photo_active.png");
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.body}>
      <TouchableHighlight onPress={handlePress}>
        <Image
          source={
            handlePress
              ? require("../../../assets/images/static/back-arrow.png")
              : renderIconHeader()
          }
          style={styles.image}
        />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    padding: 10,
    borderRadius: 12,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: colors.black,
    shadowRadius: 6,
    shadowOpacity: 0.1,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
