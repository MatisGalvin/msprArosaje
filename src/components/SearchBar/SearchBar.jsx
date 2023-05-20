import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import colors from "../../../colors";

export default function SearchBar() {
  return (
    <View style={styles.textInputView}>
      <TextInput
        placeholder="Pays, Ville, Rue, Code postal..."
        style={styles.textInput}
      />
      <TouchableOpacity>
        <Image
          style={styles.icon}
          source={require("../../../assets/images/static/searchBar-search.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  textInputView: {
    backgroundColor: "white",
    height: 38,
    width: "100%",
    borderRadius: 6,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,

    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  textInput: {
    width: "90%",
  },
  icon: {
    width: 15,
    height: 16,
  },
});
