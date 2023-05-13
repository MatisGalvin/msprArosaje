import { Text, View } from "react-native";
import { LargeButton } from "../../../components/LargeButton/LargeButton";
import { DetailsPlantCard } from "../../../components/DetailsPlantCard/DetailsPlantCard";
import { SimplePlantCard } from "../../../components/SimplePlantCard/SimplePlantCard";

export default function MesPlantes() {

  const renderViews = () => {
    const views = [];
    for (let i = 0; i < 4; i++) {
      views.push(
        <View key={i} style={{marginTop: 15}}>
          <SimplePlantCard
            style={{ marginTop: 30 }}
            image={require("../../../../assets/images/examples/feey--9c16pMI9uU-unsplash.jpg")}
            name="Ficus"
            description="Vieux et résistant mais toujours de bon poil"
          />
        </View>
      );
    }
    return views;
  };

  return (
    <View style={{ width: "100%", marginTop: 25 }}>
      <LargeButton
        image={require("../../../../assets/images/static/plus.png")}
        handlePress
      >
        Ajouter une nouvelle plante
      </LargeButton>
      {renderViews()}
    </View>
  );
}
