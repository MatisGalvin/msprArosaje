import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CTACard } from "./src/components/CTACard/CTACard";
import colors from "./colors";

export default function App() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <View
                    alignItems="center"
                    justifyContent="center"
                    flex={1}
                >
                    <Text>HEADER</Text>
                </View>
                <View style={{flex: 6}} >
                    <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'start', padding: 16, flex: 1, gap: 50}}>

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
