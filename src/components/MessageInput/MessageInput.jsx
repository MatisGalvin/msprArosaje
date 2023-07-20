import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import colors from "../../../colors";
import { useState } from "react";

export function MessageInput({handlePress, setMessage, message}) {
    
  return (
    <View style={styles.textInputView}>
      {/* <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../../assets/images/static/takePicture.png")}
          />
        </TouchableOpacity> */}
      <TextInput
        multiline
        placeholder="Votre message..."
        style={styles.textInput}
        value={message}
        onChangeText={setMessage}
      />
      {message !== "" && (
      <TouchableOpacity style={{ width: "20%", alignSelf: "flex-end" }} onPress={handlePress}>
          <Text style={styles.textButton}>Envoyer</Text>
      </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  textInputView: {
    minHeight: 38,
    maxHeight: 130,
    //   maxHeight: 4*font + padding + border
    borderRadius: 25,
    padding: 15,
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray[600],
  },
  textInput: {
    width: "75%",
    paddingTop: 0
  },
  textButton: {
    color: colors.green[400],
    fontWeight: "700",
    textAlign: "right"
  },
});
