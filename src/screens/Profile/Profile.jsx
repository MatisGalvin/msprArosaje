import { Text, View } from "react-native";
import { Header } from "../../components/Header/Header";
import utilsStylesheet from "../../utils/utilsStylesheet";
import { WrapperScreen } from "../../components/WrapperScreen/WrapperScreen";
import { useNavigation } from "@react-navigation/native";
export default function Profile() {
  const navigation = useNavigation();
  return (
    <WrapperScreen>
      <View style={{ flex: 1 }}>
        <Header
          screenName="Profile"
          handlePress={() => navigation.goBack()}
          customStylesheet={utilsStylesheet.containerPadding}
          showParameters={true}
        />
      </View>
    </WrapperScreen>
  );
}
