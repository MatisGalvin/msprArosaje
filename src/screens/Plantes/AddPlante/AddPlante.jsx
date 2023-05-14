import { useNavigation } from "@react-navigation/native";
import { ScrollView, Button, Text, View, Dimensions } from "react-native";
import { Header } from "../../../components/Header/Header";
import { SectionTitle } from "../../../components/SectionTitle/SectionTitle";
import GalleryCard from "../../../components/GalleryCard/GalleryCard";
import FormCard from "../../../components/FormCard/FormCard";
import { LargeButton } from "../../../components/LargeButton/LargeButton";
import { useState } from "react";

export default function AddPlante() {
  const navigation = useNavigation();

  [canSubmit, setCanSubmit] = useState(false);

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

          <GalleryCard />

          <FormCard setCanSubmit={setCanSubmit} />
          {canSubmit ? (
            <LargeButton
              image={require("../../../../assets/images/static/plus.png")}
              handlePress
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
