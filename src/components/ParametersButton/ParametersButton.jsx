import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../../colors";
import { useNavigation } from "@react-navigation/native";
export default function ParametersButton() {
    const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Parameters")}>
      <Image
        source={require("../../../assets/images/static/gear.png")}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    image: {
      width: 31,
      height: 31,
      borderRadius: 50,
      backgroundColor: colors.white
    },
  });