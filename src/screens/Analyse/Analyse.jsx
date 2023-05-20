import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function Analyse() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const openCamera = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setLargePicture(result.assets[0].uri);
    } else {
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    if (isFocused) {
      openCamera();
    }
  }, [isFocused]);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
