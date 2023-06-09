import { Text, View } from "react-native";
import { LargeButton } from "../../../components/LargeButton/LargeButton";
import { DetailsPlantCard } from "../../../components/DetailsPlantCard/DetailsPlantCard";
import { SimplePlantCard } from "../../../components/SimplePlantCard/SimplePlantCard";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function MesPlantes() {
  const navigation = useNavigation();

  const appStore = useSelector((state) => state.appStore);

  const [mesPlantes, setMesPlantes] = useState([]);

  useEffect(() => {
    setMesPlantes(appStore.ownPlants);
  }, []);

  // const renderViews = () => {
  //   const views = [];

  //   for (let i = 0; i < 4; i++) {
  //     views.push(
  //       <View key={i} style={{ marginTop: 15 }}>
  //         <SimplePlantCard
  //           style={{ marginTop: 30 }}
  //           image={require("../../../../assets/images/examples/feey--9c16pMI9uU-unsplash.jpg")}
  //           name="Ficus"
  //           description="Vieux et résistant mais toujours de bon poil"
  //         />
  //       </View>
  //     );
  //   }
  //   return views;
  // };

  return mesPlantes.length > 0 ?
    <View style={{ flex: 1, marginTop: 25 }}>
      <LargeButton
        image={require("../../../../assets/images/static/plus.png")}
        handlePress={() => navigation.navigate("AddPlante")}
      >
        Ajouter une nouvelle plante
      </LargeButton>
      {/* {renderViews()} */}

      {mesPlantes.map((plant) => (
        <View key={plant.id} style={{ marginTop: 15 }}>
          <SimplePlantCard
            style={{ marginTop: 30 }}
            image={{uri: plant.attributes.images.data[0].attributes.base64}}
            name={plant.attributes.name}
            description={plant.attributes.description}
            handlePress={() => navigation.navigate("NewReport", {
              owner: plant.attributes.owner.data.attributes.username,
              image: plant.attributes.images.data[0].attributes.base64,
              plant: plant,
              isNewReport: false
            })}
          />
        </View>
      ))}
    </View> : <View></View>;
}
