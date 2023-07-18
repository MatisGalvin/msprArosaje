import { Text, View } from "react-native";
import { LargeButton } from "../../../components/LargeButton/LargeButton";
import { DetailsPlantCard } from "../../../components/DetailsPlantCard/DetailsPlantCard";
import { SimplePlantCard } from "../../../components/SimplePlantCard/SimplePlantCard";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectOwnPlants } from "../../../redux/reducers/appReducer";
import { Plants } from "../../../api/Plants";
import { selectID, selectJWT } from "../../../redux/reducers/authReducer";
import store from "../../../redux/appStore";
import { useIsFocused } from "@react-navigation/native";

export default function MesPlantes() {
  const navigation = useNavigation();

  const plants = useSelector(selectOwnPlants);
  const userID = useSelector(selectID);
  const jwt = useSelector(selectJWT);

  const [ownPlants, setOwnPlants] = useState([]);

  const isFocused = useIsFocused();

  const getPlants = async () => {
    const plants = await Plants.getPlantsByUserId(userID, jwt);
    
    store.dispatch({ type: "INIT_OWN_PLANTS", plants: plants.data });
    setOwnPlants(plants.data);
  }

  useEffect(() => {
    if(ownPlants.length !== 0) {
        setOwnPlants(plants);
    }

    getPlants();
  }, [isFocused]);

  return(
    <View style={{ flex: 1, marginTop: 25 }}>
      <LargeButton
        image={require("../../../../assets/images/static/plus.png")}
        handlePress={() => navigation.navigate("AddPlante")}
      >
        Ajouter une nouvelle plante
      </LargeButton>
      {/* {renderViews()} */}
      {ownPlants.length > 0 && ownPlants.map((plant) => (
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
    </View>
  )
}