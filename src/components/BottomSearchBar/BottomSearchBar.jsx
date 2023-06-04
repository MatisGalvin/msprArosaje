import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import colors from "../../../colors";
import { Tips } from "../../api/Tips";
import { useSelector } from "react-redux";

export default function BottomSearchBar({plantId, setIsSubmitted}) {
  const [message, setMessage] = useState("");
  const [inputHeight, setInputHeight] = useState(40);

  const appStore = useSelector((state) => state.appStore);

  const handleContentSizeChange = (event) => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };

  const sendMessage = async () => {
    // Code pour envoyer le message
    await Tips.postTip(message, plantId, appStore.id)
    setMessage("");
    setIsSubmitted(true)
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input]}
        multiline
        value={message}
        onChangeText={setMessage}
        // onContentSizeChange={handleContentSizeChange}
        placeholder="Saisissez votre message"
      />
      <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
        <Text style={styles.sendButtonText}>Publier</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderWidth: 1,
    borderColor: colors.gray[400],
    borderRadius: 10
  },
  input: {
    flex: 1,
    maxHeight: 120,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 8,
    color: colors.gray[600],
    maxHeight: 125
  },
  sendButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-end"
  },
  sendButtonText: {
    color: colors.green[400],
    fontSize: 16,
    fontWeight: "bold",
  },
});
