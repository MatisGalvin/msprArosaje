import { Header } from "../../components/Header/Header";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle";
import { SimplePlantCard } from "../../components/SimplePlantCard/SimplePlantCard";
import { DetailsPlantCard } from "../../components/DetailsPlantCard/DetailsPlantCard";
import { CTACard } from "../../components/CTACard/CTACard";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TipCardsSlider from "../../components/TipCard/TipCardsSlider";
import { useSelector } from "react-redux";
import utilsStylesheet from "../../utils/utilsStylesheet";

export const Home = () => {
  const appStore = useSelector((state) => state.appStore);

    return <View style={{flex: 1}}>
        <Header screenName="Accueil" customStylesheet={utilsStylesheet.containerPadding} />
        <View style={{flex: 6}} >
            <ScrollView style={utilsStylesheet.containerPadding} contentContainerStyle={{alignItems: 'center', justifyContent: 'start', gap: 10}} showsVerticalScrollIndicator={false}>

            <SectionTitle
              image={require("../../../assets/images/static/plant.png")}
            >
              Mes plantes
            </SectionTitle>

            <DetailsPlantCard
              image={require("../../../assets/images/examples/feey--9c16pMI9uU-unsplash.jpg")}
              owner="Quentin Hovine"
              name="Ficus"
              description="Vieux et résistant mais toujours de bon poil"
              address="1 Place Georges Frêches , 34000 Montpellier"
              imageButton={require("../../../assets/images/static/phone.png")}
              textButton="Contacter le/la propriétaire"
              handleButton={() => {}}
              handleEditBtn={() => {}}
            />

            <SimplePlantCard
              image={require("../../../assets/images/examples/feey--9c16pMI9uU-unsplash.jpg")}
              owner="Quentin Hovine"
              name="Ficus"
              description="Vieux et résistant mais toujours de bon poil"
            />

            <CTACard
              image={require("../../../assets/images/static/minipot.png")}
              title="Vous n’avez pas encore de plante !"
              content="Ajoutez une plante pour pouvoir la faire garder ou obtenir des conseils de botanistes professionnels"
              textButton="Ajouter votre première plante"
              handlePressButton={() => {}}
              imageButton={require("../../../assets/images/static/plus.png")}
            />
            <CTACard
              image={require("../../../assets/images/static/health.png")}
              title="Vous n’avez pas encore de plante !"
              content="Ajoutez une plante pour pouvoir la faire garder ou obtenir des conseils de botanistes professionnels"
              textButton="Diagnostiquer ma plante"
              handlePressButton={() => {}}
              imageButton={require("../../../assets/images/static/plant-scan.png")}
            />

            <SectionTitle
              image={require("../../../assets/images/static/plant.png")}
            >
              Conseils de la semaine
            </SectionTitle>

            <TipCardsSlider />
        </ScrollView>
      </View>
    </View>;
};

const styles = StyleSheet.create({});
