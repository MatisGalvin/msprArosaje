import { useNavigation } from "@react-navigation/native";
import { ScrollView, Button, Text, View, Dimensions } from "react-native";
import { Header } from "../../../components/Header/Header";
import { SectionTitle } from "../../../components/SectionTitle/SectionTitle";
import GalleryCard from "../../../components/GalleryCard/GalleryCard";
import FormCard from "../../../components/FormCard/FormCard";
import { LargeButton } from "../../../components/LargeButton/LargeButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { StrapiDatas } from "../../../api/api";
import { Plants } from "../../../api/Plants";

export default function AddPlante() {
  const navigation = useNavigation();

  [canSubmit, setCanSubmit] = useState(false);

  const appStore = useSelector((state) => state.appStore);

  const [largePicture, setLargePicture] = useState("");
  const [smallPicture1, setSmallPicture1] = useState("");
  const [smallPicture2, setSmallPicture2] = useState("");
  const [smallPicture3, setSmallPicture3] = useState("");

  const [plantName, setPlantName] = useState("");
  const [plantDescription, setPlantDescription] = useState("");

  const submitPlant = () => {

    setLargePicture("https://www.decodujardin.fr/4186-large_default/palmier-du-chili.jpg")

    const images = [largePicture, smallPicture1, smallPicture2, smallPicture3];
    const owner = appStore.username;

    Plants.addPlant(plantName, plantDescription, owner, images.filter((item) => item != ""))
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header screenName="Accueil" />
      <View style={{ flex: 6 }}>
        <ScrollView
          style={{ flex: 1 }}
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
          {canSubmit ? (
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
    </View>
  );
}
