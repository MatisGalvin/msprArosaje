import React from "react";
import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CTACard } from "./src/components/CTACard/CTACard";

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FEFF" }}>
                <View
                    alignItems="center"
                    justifyContent="center"
                    flex={1}
                >
                    <Text>HEADER</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', padding: 16}}>
                    <CTACard
                        image={require('./assets/images/static/minipot.png')}
                        title="Vous n’avez pas encore de plante !"
                        content="Ajoutez une plante pour pouvoir la faire garder ou obtenir des conseils de botanistes professionnels"
                        imageButton={require('./assets/images/static/plus.png')}
                        textButton={"Ajouter votre première plante"}
                    />
                    <CTACard
                        image={require('./assets/images/static/health.png')}
                        title="J’ai besoin d’un conseil"
                        content="Prenez une photo de votre plante et notre IA vous conseillera rapidement et efficacement pour régler le problème"
                        imageButton={require('./assets/images/static/plus.png')}
                        textButton={"Diagnostiquer ma plante"}
                        handlePressButton={() => console.log("test")}
                    />
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
