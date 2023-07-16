import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { LargeButton } from "../../../components/LargeButton/LargeButton";
import { SimplePlantCard } from "../../../components/SimplePlantCard/SimplePlantCard";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Plants } from "../../../api/Plants";
import { Tips } from "../../../api/Tips";
import { useSelector } from "react-redux";
import { selectJWT } from "../../../redux/reducers/authReducer";

export default function MesProteges() {
  const [allPlants, setAllPlants] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const jwt = useSelector(selectJWT)

  const navigation = useNavigation();

  function fetchPlants() {
    Plants.getPlants(jwt)
      .then((resultFetch) => {
        setAllPlants(resultFetch.data);
        setIsLoaded(true);
      })
      .catch((error) => console.log('MesProteges:fetchPlants', error));
  }

  async function getTheTips(plantId) {
    Tips.getTipsByPlantId(plantId, jwt)
      .then((resultFetch) => {
        return resultFetch.data
      })
      .catch((error) => console.log('MesProteges:getTheTips', error));
  }


  useEffect(() => {
    fetchPlants()
  }, []);

  // const renderViews = () => {
  //   const views = [];
  //   for (let i = 0; i < 4; i++) {
  //     views.push(
  // <View key={i} style={{ marginTop: 15 }}>
  //   <SimplePlantCard
  //     style={{ marginTop: 30 }}
  //     image={require("../../../../assets/images/examples/feey--9c16pMI9uU-unsplash.jpg")}
  //     name="Ficus"
  //     description="Vieux et résistant mais toujours de bon poil"
  //     handlePress={() => navigation.navigate("NewReport", {

  //     })}
  //   />
  // </View>
  //     );
  //   }
  //   return views;
  // };

  return (
    <View style={{ marginTop: 25 }}>
      <LargeButton
        image={require("../../../../assets/images/static/shovel.png")}
      >
        Garder une nouvelle plante
      </LargeButton>
        {!isLoaded && <View style={{marginTop: 60}}><ActivityIndicator/></View>}
        {isLoaded && allPlants.map((plant) => {
          const mytips = getTheTips(plant.id)
        return(
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
        )
      })}
      
    </View>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    width: "100%",
    height: "100%",
    overflow: "visible"
  }
})