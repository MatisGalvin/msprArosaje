import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../../../colors";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function GalleryCard({
  largePicture,
  setLargePicture,
  smallPicture1,
  setSmallPicture1,
  smallPicture2,
  setSmallPicture2,
  smallPicture3,
  setSmallPicture3,
  style,
}) {
  const [whichPictureState, setWhichPictureState] = useState("");

  const handleChooseOption = (whichPicture) => {
    Alert.alert(
      "Ajouter une photo",
      "Choisissez une option pour ajouter une photo",
      [
        {
          text: "Galerie",
          onPress: () => openImagePicker(whichPicture),
        },
        {
          text: "Appareil photo",
          onPress: () => openCamera(whichPicture),
        },
        {
          text: "Annuler",
          style: "cancel",
        },
      ]
    );
  };

  const openImagePicker = async (whichPicture) => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
      base64: true,
    });

    if (!result.canceled) {
      switch (whichPicture) {
        case "large":
          setLargePicture(`data:image/png;base64,${result.assets[0].base64}`);
          break;
        case "small1":
          setSmallPicture1(`data:image/png;base64,${result.assets[0].base64}`);
          break;
        case "small2":
          setSmallPicture2(`data:image/png;base64,${result.assets[0].base64}`);
          break;
        case "small3":
          setSmallPicture3(`data:image/png;base64,${result.assets[0].base64}`);
          break;

        default:
          break;
      }
    }
  };

  const openCamera = async (whichPicture) => {
    // Ask the user for the permission to access the media library
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
      base64: true,
    });

    if (!result.canceled) {
      switch (whichPicture) {
        case "large":
          setLargePicture(`data:image/png;base64,${result.assets[0].base64}`);
          break;
        case "small1":
          setSmallPicture1(`data:image/png;base64,${result.assets[0].base64}`);
          break;
        case "small2":
          setSmallPicture2(`data:image/png;base64,${result.assets[0].base64}`);
          break;
        case "small3":
          setSmallPicture3(`data:image/png;base64,${result.assets[0].base64}`);
          break;

        default:
          break;
      }
    }
  };

  const renderLargePicture = () => {
    if (!largePicture) {
      return (
        <TouchableOpacity
          style={styles.largeNoPicture}
          onPress={() => {
            handleChooseOption("large");
          }}
        >
          <Image
            source={require("../../../assets/images/static/add-picture.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.largePicture}
          onPress={() => {
            handleChooseOption("large");
          }}
        >
          <Image
            source={{ uri: largePicture }}
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
      );
    }
  };

  const renderSmallPicture = (picture) => {
    let checkingPicture;
    switch (picture) {
      case "small1":
        checkingPicture = smallPicture1;
        break;
      case "small2":
        checkingPicture = smallPicture2;
        break;
      case "small3":
        checkingPicture = smallPicture3;
        break;
      default:
        break;
    }
    if (!checkingPicture) {
      return (
        <TouchableOpacity
          style={styles.smallNoPicture}
          onPress={() => {
            handleChooseOption(picture);
          }}
        >
          <Image
            source={require("../../../assets/images/static/add-picture.png")}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.smallPicture}
          onPress={() => {
            handleChooseOption(picture);
          }}
        >
          <Image
            source={{ uri: checkingPicture }}
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[styles.body, style]}>
      <View style={styles.container}>
        {renderLargePicture()}

        <View style={styles.smallPictures}>
          {renderSmallPicture("small1")}

          {renderSmallPicture("small2")}

          {renderSmallPicture("small3")}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    minWidth: "100%",
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 12,

    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  container: {
    alignSelf: "stretch",
    gap: 16,
  },
  smallTitle: {
    width: "100%",
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray[600],
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray[600],
  },
  textInput: {
    width: "100%",
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 8,
    borderColor: colors.gray[100],
    borderWidth: 1,
    borderRadius: 6,
    color: colors.gray[600],
  },
  textArea: {
    width: "100%",
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    padding: 10,
    gap: 8,
    borderColor: colors.gray[100],
    borderWidth: 1,
    borderRadius: 6,
    color: colors.gray[600],
    paddingBottom: 100,
    textAlignVertical: "top",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  largeNoPicture: {
    width: "100%",
    height: 285,
    backgroundColor: colors.gray[50],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  largePicture: {
    width: "100%",
    height: 285,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    overflow: "hidden",
  },
  smallPictures: {
    height: 80,
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  smallNoPicture: {
    flexGrow: 1,
    backgroundColor: colors.gray[50],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  smallPicture: {
    flexGrow: 1,
    backgroundColor: colors.gray[50],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    overflow: "hidden",
  },
});
