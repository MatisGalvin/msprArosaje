import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CTACard } from "./src/components/CTACard/CTACard";
import colors from "./colors";
import { Header } from "./src/components/Header/Header";
import { SectionTitle } from "./src/components/SectionTitle/SectionTitle";
import { PlantCard } from "./src/components/SimplePlantCard/SimplePlantCard";
import { DetailsPlantCard } from "./src/components/DetailsPlantCard/DetailsPlantCard";

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, padding: 16, paddingTop: 0 }}>
                {/* <View
                    alignItems="center"
                    justifyContent="center"
                    flex={1}
                >
                    <Text>HEADER</Text>
                </View> */}
                <Header screenName="Accueil" />
                <View style={{flex: 6}} >
                    <ScrollView style={{overflow: 'visible', flex: 1}} contentContainerStyle={{alignItems: 'center', justifyContent: 'start', gap: 10}}>

                        <SectionTitle image={require('./assets/images/static/plant.png')}>Mes plantes</SectionTitle>

                        <DetailsPlantCard
                            image={require('./assets/images/examples/feey--9c16pMI9uU-unsplash.jpg')}
                            owner="Quentin Hovine"
                            name="Ficus"
                            description="Vieux et résistant mais toujours de bon poil"
                            address="1 Place Georges Frêches , 34000 Montpellier"
                            imageButton={require('./assets/images/static/phone.png')}
                            textButton="Contacter le/la propriétaire"
                            handleButton={() => {}}
                            handleEditBtn={() => {}}
                        />

                        <SimplePlantCard
                            image={require('./assets/images/examples/feey--9c16pMI9uU-unsplash.jpg')}
                            owner="Quentin Hovine"
                            name="Ficus"
                            description="Vieux et résistant mais toujours de bon poil"
                        />

                        <CTACard
                            image={require('./assets/images/static/minipot.png')}
                            title="Vous n’avez pas encore de plante !"
                            content="Ajoutez une plante pour pouvoir la faire garder ou obtenir des conseils de botanistes professionnels"
                            textButton="Ajouter votre première plante"
                            handlePressButton={() => {}}
                            imageButton={require('./assets/images/static/plus.png')}
                        />
                        <CTACard
                            image={require('./assets/images/static/health.png')}
                            title="Vous n’avez pas encore de plante !"
                            content="Ajoutez une plante pour pouvoir la faire garder ou obtenir des conseils de botanistes professionnels"
                            textButton="Diagnostiquer ma plante"
                            handlePressButton={() => {}}
                            imageButton={require('./assets/images/static/plant-scan.png')}
                        />


                        <SectionTitle image={require('./assets/images/static/plant.png')}>Conseils de la semaine</SectionTitle>

                    </ScrollView>
                </View>
                <View
                    alignItems="center"
                    justifyContent="center"
                    flex={1}
                >
                    <Text>FOOTER</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
