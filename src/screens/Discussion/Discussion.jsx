import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WrapperScreen } from "../../components/WrapperScreen/WrapperScreen";
import { Header } from "../../components/Header/Header";
import utilsStylesheet from "../../utils/utilsStylesheet";
import { useNavigation } from "@react-navigation/native";

export const Discussion = () => {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "100%", height: "100%" }}
    >
      <WrapperScreen>
        <View style={{ flex: 1 }}>
          <Header
            screenName="Messages"
            handlePress={() => navigation.goBack()}
            customStylesheet={utilsStylesheet.containerPadding}
          />
          <ScrollView
            style={utilsStylesheet.containerPadding}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "start",
              gap: 10,
            }}
            showsVerticalScrollIndicator={false}
          ></ScrollView>
        </View>
      </WrapperScreen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});
