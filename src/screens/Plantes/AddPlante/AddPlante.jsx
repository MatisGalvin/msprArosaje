import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  Button,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Header } from "../../../components/Header/Header";
import { SectionTitle } from "../../../components/SectionTitle/SectionTitle";
import GalleryCard from "../../../components/GalleryCard/GalleryCard";
import FormCard from "../../../components/FormCard/FormCard";
import { LargeButton } from "../../../components/LargeButton/LargeButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { StrapiDatas } from "../../../api/api";
import { Plants } from "../../../api/Plants";
import { WrapperScreen } from "../../../components/WrapperScreen/WrapperScreen";
import utilsStylesheet from "../../../utils/utilsStylesheet";
import ImgToBase64 from "react-native-image-base64";
import * as FileSystem from "expo-file-system";
import { initState } from "../../../utils/initState";
import Image from "../../../api/Image";

export default function AddPlante() {
  const navigation = useNavigation();

  [waitSubmit, setWaitSubmit] = useState(false);

  [canSubmit, setCanSubmit] = useState(false);

  const appStore = useSelector((state) => state.appStore);

  const [largePicture, setLargePicture] = useState("");
  const [smallPicture1, setSmallPicture1] = useState("");
  const [smallPicture2, setSmallPicture2] = useState("");
  const [smallPicture3, setSmallPicture3] = useState("");

  const [plantName, setPlantName] = useState("");
  const [plantDescription, setPlantDescription] = useState("");

  const submitPlant = async () => {
    setWaitSubmit(true);

    const images = [largePicture, smallPicture1, smallPicture2, smallPicture3];
    const ownerId = appStore.id;

    Plants.addPlant(plantName, plantDescription, ownerId, images)
      .then(() => {
        initState(appStore.username);
        setWaitSubmit(false);
        navigation.navigate("Plantes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "100%", height: "100%" }}
    >
      <WrapperScreen>
        <View style={{ flex: 1 }}>
          <Header
            screenName="Plantes"
            handlePress={() => navigation.goBack()}
            customStylesheet={utilsStylesheet.containerPadding}
          />
          <ScrollView
            style={utilsStylesheet.containerPadding}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "start",
              gap: 10,
            }}
            showsVerticalScrollIndicator={false}
          >
            <SectionTitle
              image={require("../../../../assets/images/static/plant.png")}
            >
              Ajouter une nouvelle plante
            </SectionTitle>

            <GalleryCard
              largePicture={largePicture}
              setLargePicture={setLargePicture}
              smallPicture1={smallPicture1}
              setSmallPicture1={setSmallPicture1}
              smallPicture2={smallPicture2}
              setSmallPicture2={setSmallPicture2}
              smallPicture3={smallPicture3}
              setSmallPicture3={setSmallPicture3}
            />

            <FormCard
              setCanSubmit={setCanSubmit}
              streetProp={appStore.address}
              cityProp={appStore.city}
              zipcodeProp={appStore.zipcode}
              plantName={plantName}
              setPlantName={setPlantName}
              plantDescription={plantDescription}
              setPlantDescription={setPlantDescription}
            />
            {}
            {canSubmit && !waitSubmit ? (
              <LargeButton
                image={require("../../../../assets/images/static/plus.png")}
                handlePress={submitPlant}
              >
                Ajouter ma plante
              </LargeButton>
            ) : (
              <LargeButton
                image={require("../../../../assets/images/static/plus.png")}
                dark
                handlePress
              >
                Ajouter ma plante
              </LargeButton>
            )}
          </ScrollView>
        </View>
      </WrapperScreen>
    </KeyboardAvoidingView>
  );
}
