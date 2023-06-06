import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Tag } from "../../components/Tag/Tag";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import utilsStylesheet from "../../utils/utilsStylesheet";
import colors from "../../../colors";

export default function AnalyseDetails({ plantHealth, setPlantDetails, setLargePicture, setIsLoaded }) {

  if (!plantHealth) {
    return false;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: plantHealth.images[0].url }}
        style={styles.image}
      />
      <TouchableOpacity
        onPress={() => {
          setPlantDetails(false);
          setIsLoaded(false);
          setLargePicture(false);
        }}
        style={styles.resetImageButton}
      >
        <Text style={styles.resetImageText}>&#x2039;</Text>
      </TouchableOpacity>
      <View style={styles.healthPopupContainer}>
        <ScrollView
          style={{ padding: 16, flex: 1 }}
          contentContainerStyle={{ gap: 5, flexGrow: 1, paddingBottom: 40 }}
        >
          <SectionTitle
            image={require("../../../assets/images/static/aidkit.png")}
          >
            Diagnostic de votre plante
          </SectionTitle>
          <Tag color={plantHealth.is_plant ? "green" : "red"}>
            {plantHealth.is_plant
              ? "C'est une plante"
              : "Ce n'est pas une plante"}{" "}
            (probabilité :{" "}
            {plantHealth.is_plant
              ? parseFloat(
                  plantHealth.is_plant_probability
                    .toString()
                    .substring(0, 4)
                ) * 100
              : 100 -
                parseFloat(
                  plantHealth.is_plant_probability
                    .toString()
                    .substring(0, 4)
                ) *
                  100}
            %)
          </Tag>
          <Tag
            color={
              plantHealth.health_assessment.is_healthy ? "green" : "red"
            }
          >
            {plantHealth.health_assessment.is_healthy
              ? "En bonne forme"
              : "Malade"}{" "}
            (probabilité :{" "}
            {plantHealth.health_assessment.is_healthy
              ? plantHealth.health_assessment.is_healthy_probability
                  .toString()
                  .substring(2, 4) + "%"
              : 100 -
                plantHealth.health_assessment.is_healthy_probability
                  .toString()
                  .substring(2, 4) +
                "%"}
            )
          </Tag>
          <SectionTitle
            image={require("../../../assets/images/static/aidkit.png")}
          >
            Maladies probables
          </SectionTitle>
          {plantHealth.health_assessment.diseases.map((disease, key) => {
            if (disease.probability < 0.1) {
              return;
            }

            return (
              <View key={key} style={styles.diseaseItemContainer}>
                <Text style={styles.diseaseItemName}>
                  {disease.disease_details.local_name
                    .slice(0, 1)
                    .toUpperCase() +
                    disease.disease_details.local_name.slice(
                      1,
                      disease.disease_details.local_name.length
                    )}
                </Text>

                <View style={styles.diseaseItemProbability}>
                  {/* {parseFloat(disease.probability.toString().substring(2, 4))}% */}
                  <Text
                    style={{
                      fontWeight: "bold",
                      color:
                          disease.probability.toString().substring(2, 4) > 60
                            ? "#2b804a"
                            : disease.probability.toString().substring(2, 4) <
                              33
                            ? "#333"
                            : "#9c662f",
                      zIndex: 55,
                    }}
                  >
                    Probabilité (
                    {disease.probability.toString().substring(2, 4)}%)
                  </Text>
                  <View
                    style={[
                      styles.diseaseItemProbabilityBar,
                      {
                        width:
                          parseFloat(
                            disease.probability.toString().substring(2, 4)
                          ) + "%",
                        backgroundColor:
                          disease.probability.toString().substring(2, 4) > 60
                            ? "#4ADE80"
                            : disease.probability.toString().substring(2, 4) <
                              33
                            ? "#ef4444"
                            : "#FDBA74",
                      },
                    ]}
                  ></View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 380,
    alignSelf: "stretch",
    resizeMode: "cover",
  },
  healthPopupContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: -12,
    backgroundColor: colors.background,
    alignItems: "stretch",
    flex: 1,
  },
  resetImageButton: {
    position: "absolute",
    top: 0,
    left: 16,
  },
  resetImageText: {
    color: colors.white,
    fontSize: 60,
    fontWeight: 300,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 5,
  },
  diseaseItemContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    gap: 10,

    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,

    padding: 10,
    marginBottom: 5,
  },
  diseaseItemName: {
    fontWeight: 'bold'
  },
  diseaseItemProbability: {
    height: 20,
    borderWidth: 1,
    borderColor: colors.gray[200],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    position: "relative",
  },
  diseaseItemProbabilityBar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "50%",
    borderRadius: 7,
    zIndex: 50,
  },
});
