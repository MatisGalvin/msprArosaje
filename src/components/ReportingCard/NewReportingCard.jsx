import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import colors from "../../../colors";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function NewReportingCard() {
  const [largePicture, setLargePicture] = useState("");

  // Je créé ici un state avec des commentaires puisqu'à la création du rapport, les commentaires seront créés directement à partir de ce composant
  const [commentaires, setCommentaires] = useState([]);

  const handleChooseOption = () => {
    Alert.alert(
      "Ajouter une photo",
      "Choisissez une option pour ajouter une photo",
      [
        {
          text: "Galerie",
          onPress: openImagePicker,
        },
        {
          text: "Appareil photo",
          onPress: openCamera,
        },
        {
          text: "Annuler",
          style: "cancel",
        },
      ]
    );
  };

  const openImagePicker = async () => {
    // Ask the user for the permission to access the media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        setLargePicture(result.assets[0].uri);
        }
      }

  const openCamera = async () => {
    // Ask the user for the permission to access the media library
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
      }

      const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setLargePicture(result.assets[0].uri);
    }
  };

  const renderLargePicture = () => {
    if (!largePicture) {
      return (
        <TouchableOpacity
          style={styles.largeNoPicture}
          onPress={() => handleChooseOption()}
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
          onPress={() => handleChooseOption()}
        >
          <Image
            source={{ uri: largePicture }}
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        {renderLargePicture()}
        <Text style={styles.nameText}>Tous les commentaires</Text>
        {commentaires.map((item) => {
          return (
            <View key={item} style={styles.commentContainer}>
              <View style={styles.imageContainer}>
                <Image source={item.picture} style={styles.profilePic} />
              </View>
              <View style={styles.contentContainer}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.nameComment}>{item.name} </Text>
                  <Text style={styles.hourComment}>{item.hour}</Text>
                </View>
                <Text style={styles.messageComment}>{item.message}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    width: "100%",
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
  image: {
    alignSelf: "stretch",
    width: "100%",
    height: undefined,
    aspectRatio: 1 / 0.85,
    borderRadius: 6,
  },
  addressContainer: {
    flexDirection: "row",
    gap: 8,
  },
  addressImage: {
    width: 19,
    height: 19,
  },
  addressTextWrapper: {
    borderBottomWidth: 1,
  },
  addressText: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.gray[600],
  },
  nameText: {
    color: colors.gray[600],
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionText: {
    color: colors.gray[600],
    fontSize: 14,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    paddingLeft: 5,
  },
  imageContainer: {
    width: "10%",
  },
  profilePic: {
    width: 30,
    height: 30,
  },
  nameComment: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.gray[600],
  },
  hourComment: {
    fontSize: 12,
    fontWeight: "300",
    color: colors.gray[400],
  },
  messageComment: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.gray[600],
    marginTop: 3,
    // width: "80%"
  },
  dateText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.gray[600],
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
});
