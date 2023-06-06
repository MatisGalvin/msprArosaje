import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Header } from "../../components/Header/Header";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import utilsStylesheet from "../../utils/utilsStylesheet";
import { InformationSimple } from "../../components/InformationSimple/InformationSimple";
import { PhotoButton } from "../../components/PhotoButton/PhotoButton";
import colors from "../../../colors";
import ImageApi from "../../api/Image";
import PlantID from "../../api/PlantID";
import AnalyseApi from "../../api/Analyse";

export default function Analyse() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [largePicture, setLargePicture] = useState();
  const [isLoaded, setIsLoaded] = useState(true);
  const [plantDetails, setPlantDetails] = useState();

  const openCamera = async () => {
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
      setLargePicture(result.assets[0]);
    } else {
      //   navigation.navigate("Home");
    }
  };

  const sendPicture = async () => {
    setIsLoaded(false);
    const resultUpload = await ImageApi.post(largePicture.base64);
    // const resultHealth = await PlantID.post(largePicture.base64);
    let resultHealth = {};
    const resultAnalyse = await AnalyseApi.post(resultHealth);
    setIsLoaded(true);
  };

  useEffect(() => {
    if (isFocused) {
      //   openCamera();
    }
  }, [isFocused]);

  {!plantDetails ?
    <View style={styles.container}>
      <Header
        screenName="Analyse"
        customStylesheet={utilsStylesheet.containerPadding}
      />
      <View style={{ flex: 1 }}>
        <Image
          source={
            largePicture
              ? {
                  uri: largePicture.uri,
                }
              : require("../../../assets/images/static/plantastic.png")
          }
          style={[styles.image, !largePicture && styles.imageLoading]}
        />

        {largePicture && (
          <TouchableOpacity
            onPress={() => {
              setLargePicture("");
            }}
            style={styles.resetImageButton}
          >
            <Text style={styles.resetImageText}>&times;</Text>
          </TouchableOpacity>
        )}

        <View style={styles.analyseBottomBody}>
          <InformationSimple
            image={require("../../../assets/images/static/information.png")}
          >
            Veillez à ce que le soucis de votre plante soit bien visible sur
            l'image
          </InformationSimple>
          <PhotoButton handlePress={isLoaded ? (largePicture ? sendPicture : openCamera) : ()=>{}}>
            {isLoaded ? (largePicture ? "Scanner" : "Prendre une photo") : <ActivityIndicator color='#000000' />}
          </PhotoButton>
        </View>
      </View>
    </View> : <View>

    </View>}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: "stretch",
    flex: 1,
    resizeMode: "cover",
  },
  imageLoading: {
    resizeMode: "contain",
    width: 250,
    alignSelf: "center",
  },
  resetImageButton: {
    position: "absolute",
    top: 10,
    left: 16,
  },
  resetImageText: {
    color: colors.white,
    fontSize: 40,
    fontWeight: 300,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 5,
  },
  analyseBottomBody: {
    gap: 16,
    paddingVertical: 26,
  },
});
