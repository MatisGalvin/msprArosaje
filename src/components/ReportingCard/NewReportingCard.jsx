import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import colors from "../../../colors";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Tag } from "../Tag/Tag";
import { Tips } from "../../api/Tips";
import { useSelector } from "react-redux";
import { selectJWT } from "../../redux/reducers/authReducer";

export default function NewReportingCard({
  image,
  owner,
  plantId,
  isSubmitted,
}) {
  const [largePicture, setLargePicture] = useState(image ? image : "");
  const [isLoaded, setIsLoaded] = useState(false);

  // Je créé ici un state avec des commentaires puisqu'à la création du rapport, les commentaires seront créés directement à partir de ce composant
  const [commentaires, setCommentaires] = useState([]);

  const jwt = useSelector(selectJWT);

  function fetchComments() {

    Tips.getTipsByPlantId(plantId, jwt)
      .then((resultFetch) => {
        setCommentaires(resultFetch.data);
        setIsLoaded(true);
      })
      .catch((error) => console.log("NewReportingCard:fetchComments", error));
  }

  useEffect(() => {
    setIsLoaded(false);
    fetchComments();
  }, [isSubmitted]);

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
  };

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
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${hours}h${minutes} ${day}/${month}/${year}`;
  }

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
        {owner && (
          <Tag image={require("../../../assets/images/static/profile.png")}>
            {owner}
          </Tag>
        )}
        <Text style={styles.nameText}>Tous les commentaires</Text>
        {!isLoaded && (
          <View style={{ marginTop: 20, width: "100%", height: "100%" }}>
            <ActivityIndicator />
          </View>
        )}
        {isLoaded &&
          commentaires.map((item, id) => {
            return (
              <View key={id} style={styles.commentContainer}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri: item.attributes.botanist.data.attributes
                        .profile_picture.data.attributes.base64,
                    }}
                    style={styles.profilePic}
                  />
                </View>
                <View style={styles.contentContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.nameComment}>
                      {item.attributes.botanist.data.attributes.username}{" "}
                    </Text>
                    <Text style={styles.hourComment}>
                      {formatDate(item.attributes.publishedAt)}
                    </Text>
                  </View>
                  <Text style={styles.messageComment}>
                    {item.attributes.tip}
                  </Text>
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
    minWidth: "100%",
    paddingBottom: 15,
    flex: 1,
    // height: "100%",
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
    borderRadius: 50,
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
