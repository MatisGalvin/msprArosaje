import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Box
            bg="gray.700"
            alignItems="center"
            justifyContent="center"
            flex={1}
          >
            <Text>HEADER</Text>
          </Box>
          <Box bg="white" alignItems="center" justifyContent="center" flex={6}>
            <Text>CONTENT</Text>
          </Box>
          <Box
            bg="gray.700"
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
