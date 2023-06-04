import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import PlantTypeSelector from "../../components/PlantTypeSelector/PlantTypeSelector";
import MesPlantes from "./MesPlantes/MesPlantes";
import MesProteges from "./MesProteges/MesProteges";
import { render } from "react-native-web";
import { Header } from "../../components/Header/Header";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { DetailsPlantCard } from "../../components/DetailsPlantCard/DetailsPlantCard";
import { SimplePlantCard } from "../../components/SimplePlantCard/SimplePlantCard";
import { CTACard } from "../../components/CTACard/CTACard";
import TipCardsSlider from "../../components/TipCard/TipCardsSlider";

export default function Plantes() {
  [typeSelected, setTypeSelected] = useState("plantes");

  const renderPage = () => {
    if (typeSelected === "plantes") {
      return <MesPlantes />;
    } else {
      return <MesProteges />;
    }
  };

  const heightScreen = Dimensions.get("screen").height;

  return (
    <View style={{ flex: 6 }}>
      <ScrollView style={styles.scrollview}>
        <View style={{ flex: 1 }}>
          <Header screenName="Plantes" />
          <PlantTypeSelector
            style={{ marginTop: 20 }}
            typeSelected={typeSelected}
            setTypeSelected={setTypeSelected}
          />
          {renderPage()}
        </View>
      </ScrollView>
    </View>

    // <View>
    //     <PlantTypeSelector style={{marginTop: 20}} typeSelected={typeSelected} setTypeSelected={setTypeSelected} />
    //     {renderPage()}
    // </View>
  );
}
const styles = StyleSheet.create({
  scrollview: {
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
});
