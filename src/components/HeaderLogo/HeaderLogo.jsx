import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../../../colors";
import { SquircleView } from "react-native-figma-squircle";

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
        return require("../../../assets/images/static/plant.png");
        break;
    }
  };

  return (
    <SquircleView
      squircleParams={{
        cornerSmoothing: .6,
        cornerRadius: 12,
        fillColor: colors.white,
      }}
      style={styles.container}
    >
      <TouchableOpacity onPress={handlePress} style={styles.body}>
        <Image
          source={
            handlePress
              ? require("../../../assets/images/static/arrow-left.png")
              : renderIconHeader()
          }
          style={styles.image}
        />
      </TouchableOpacity>
    </SquircleView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 38,
    height: 38,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: colors.black,
    shadowRadius: 6,
    shadowOpacity: 0.1,
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
