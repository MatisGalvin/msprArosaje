import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CTACard } from "./src/components/CTACard/CTACard";

export default function App() {
    return (
        <NativeBaseProvider>
            <SafeAreaProvider style={{backgroundColor: "#F8FEFF"}}>
                <SafeAreaView style={{ flex: 1 }}>
                    <Box
                        alignItems="center"
                        justifyContent="center"
                        flex={1}
                    >
                        <Text>HEADER</Text>
                    </Box>
                    <Box alignItems="center" justifyContent="center" flex={6} p={8}>
                        <CTACard
                            image={require('./assets/images/static/minipot.png')}
                            title="Vous n’avez pas encore de plante !"
                            content="Ajoutez une plante pour pouvoir la faire garder ou obtenir des conseils de botanistes professionnels"
                        />
                        <CTACard
                            image={require('./assets/images/static/health.png')}
                            title="Vous n’avez pas encore de plante !"
                            content="Ajoutez une plante pour pouvoir la faire garder ou obtenir des conseils de botanistes professionnels"
                        />
                    </Box>
                    <Box
                        alignItems="center"
                        justifyContent="center"
                        flex={1}
                    >
                        <Text>FOOTER</Text>
                    </Box>
                </SafeAreaView>
            </SafeAreaProvider>
        </NativeBaseProvider>
    );
}
