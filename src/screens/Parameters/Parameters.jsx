import {
  Alert,
  Image,
  Linking,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../../../colors";
import { WrapperScreen } from "../../components/WrapperScreen/WrapperScreen";
import { Header } from "../../components/Header/Header";
import utilsStylesheet from "../../utils/utilsStylesheet";
import { useNavigation } from "@react-navigation/native";
import ParametersLine from "../../components/ParametersLine/ParametersLine";
import ParametersLineTitle from "../../components/ParametersLineTitle/ParametersLineTitle";
import store from "../../redux/appStore";
import { Users } from "../../api/Users";
import { useSelector } from "react-redux";
import { selectID, selectJWT } from "../../redux/reducers/authReducer";
export default function Parameters() {
  const navigation = useNavigation();

  const userID = useSelector(selectID);
  const jwt = useSelector(selectJWT);

  const logout = () => {
    store.dispatch({
      type: "APP_SIGNOUT",
    });
    store.dispatch({
      type: "setSignOut",
    });
  };

  const { RNAndroidOpenSettings } = NativeModules;

  openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL(`app-settings:`);
    } else {
      RNAndroidOpenSettings.appDetailsSettings();
    }
  };

  const handlePressURL = (url) => {
    Linking.openURL(url);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Suppression de compte",
      "Voulez-vous supprimer votre compte définitivement ?",
      [
        {
          text: "Annuler",
          style: "default",
        },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            const deletionResponse = await Users.deleteById(userID, jwt);
            if (typeof deletionResponse == "undefined") {
              console.log(
                "Parameters:handleDeleteAccount",
                "error",
                deletionResponse
              );
              return;
            }

            logout();
          },
        },
      ]
    );
  };

  return (
    <WrapperScreen>
      <View style={{ flex: 1 }}>
        <Header
          screenName="Paramètres et confidentialité"
          handlePress={() => navigation.goBack()}
          customStylesheet={utilsStylesheet.containerPadding}
          showButtons={false}
        />
        <ParametersLineTitle text="Préférences" />
        <ParametersLine
          icon={require("../../../assets/images/static/map-icon.png")}
          topic="Partage adresse"
        />
        <ParametersLine
          icon={require("../../../assets/images/static/pin.png")}
          topic="Localisation"
          handlePress={openAppSettings}
        />
        <ParametersLine
          icon={require("../../../assets/images/static/bell-icon.png")}
          topic="Notifications"
          handlePress={openAppSettings}
        />
        <ParametersLine
          icon={require("../../../assets/images/static/photo.png")}
          topic="Appareil photo"
          handlePress={openAppSettings}
        />

        <ParametersLineTitle
          text="Infos et assistance"
          style={{ marginTop: 10 }}
        />
        <ParametersLine
          icon={require("../../../assets/images/static/help.png")}
          topic="Aide"
        />
        <ParametersLine
          icon={require("../../../assets/images/static/exclamation-mark.png")}
          topic="À propos"
        />
        <ParametersLine
          icon={require("../../../assets/images/static/message.png")}
          topic="Nous contacter"
        />

        <ParametersLineTitle
          text="Inforations légales"
          style={{ marginTop: 10 }}
        />
        <ParametersLine
          topic="Politique de confidentialité"
          handlePress={() =>
            handlePressURL(
              "https://www.arosaje.com/politique-de-confidentialite"
            )
          }
        />
        <ParametersLine
          topic="Mentions légales"
          handlePress={() =>
            handlePressURL("https://www.arosaje.com/mentions-legales")
          }
        />

        <ParametersLineTitle text="Compte" style={{ marginTop: 10 }} />
        <ParametersLine
          topic="Déconnexion"
          colorText={colors.red[600]}
          handlePress={logout}
        />
        <ParametersLine
          topic="Supprimer mon compte"
          colorText={colors.red[600]}
          handlePress={handleDeleteAccount}
        />
      </View>
    </WrapperScreen>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
});
