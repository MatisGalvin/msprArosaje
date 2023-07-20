import {
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../../colors";

export default function SearchBar({ textInputProps }) {
  return (
    <View style={styles.textInputView}>
      <TextInput {...textInputProps} style={styles.textInput} />
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
    marginVertical: 16,

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
