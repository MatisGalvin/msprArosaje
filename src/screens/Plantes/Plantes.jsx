import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useState } from "react";
import PlantTypeSelector from "../../components/PlantTypeSelector/PlantTypeSelector";
import MesPlantes from "./MesPlantes/MesPlantes";
import MesProteges from "./MesProteges/MesProteges";
import { Header } from "../../components/Header/Header";
import utilsStylesheet from "../../utils/utilsStylesheet";

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
    <View style={{flex:1}}>
      <Header screenName="Plantes" customStylesheet={utilsStylesheet.containerPadding} />
      <View style={{ flex: 6 }}>
        <ScrollView
          style={utilsStylesheet.containerPadding}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "start",
            gap: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          <PlantTypeSelector
            style={{ marginTop: 20 }}
            typeSelected={typeSelected}
            setTypeSelected={setTypeSelected}
          />
          {renderPage()}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollview: {
    width: "100%",
    height: "100%",
    overflow: "visible",
  },
});
