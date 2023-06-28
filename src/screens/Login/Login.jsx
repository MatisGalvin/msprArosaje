import {
  Animated,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../../components/Header/Header";
import { BigSimpleHeader } from "../../components/BigSimpleHeader/BigSimpleHeader";
import utilsStylesheet from "../../utils/utilsStylesheet";
import { LargeButton } from "../../components/LargeButton/LargeButton";
import colors from "../../../colors";
import Checkbox from "expo-checkbox";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import Auth from "../../api/Auth";
import * as Haptics from "expo-haptics";
import { dispatch } from "react-redux";
import { setSignIn } from "../../redux/reducers/authReducer";
import store from "../../redux/appStore";
import { Users } from "../../api/Users";

export default function Login() {
  const [email, setEmail] = useState("alicejones@example.com");
  const [password, setPassword] = useState("9QzRftmQBNT5kJzp");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    const authResponse = await Auth.localConnect(email, password);

    if (!authResponse) {
      console.log("Login:handleLogin", "error", authResponse);
      return;
    }

    if (!authResponse.jwt || !authResponse.user) {
      return;
    }

    const userResponse = await Users.findById(
      authResponse.user.id,
      authResponse.jwt
    );

    if (typeof userResponse[0] == 'undefined') {
      console.log("Login:handleLogin", "error", userResponse);
      return;
    }

    if (!userResponse[0].id || userResponse[0].id !== authResponse.user.id || !userResponse[0].profile_picture) {
      console.log("Login:handleLogin", "error", !userResponse[0].id, userResponse[0].id !== authResponse.user.id, !userResponse[0].profile_picture);
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    store.dispatch({
      type: "setSignIn",
      isLoggedIn: true,
      id: authResponse.user.id,
      email: authResponse.user.email,
      profile_picture: userResponse[0].profile_picture.base64,
      username: authResponse.user.username,
      jwt: authResponse.jwt,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "100%", height: "100%" }}
    >
      <View
        style={{ flex: 1, justifyContent: "space-between", paddingTop: 30 }}
      >
        <BigSimpleHeader
          screenName="Ravis de te revoir !"
          customStylesheet={[utilsStylesheet.containerPadding, { zIndex: 50 }]}
        />

        <View style={styles.body}>
          <Image
            style={[styles.illustration, styles.illustration1]}
            source={require("../../../assets/images/static/login_01.png")}
          />
          <Image
            style={[styles.illustration, styles.illustration2]}
            source={require("../../../assets/images/static/login_02.png")}
          />

          <Text style={styles.title}>Connexion</Text>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Identifiant ou adresse mail</Text>
              <View style={styles.inputGroup}>
                <Image
                  style={styles.inputImage}
                  source={require("../../../assets/images/static/profile.png")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="johndoa@mail.com"
                  onChangeText={setEmail}
                  value={email}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <View style={styles.inputGroup}>
                <Image
                  style={styles.inputImage}
                  source={require("../../../assets/images/static/lock.png")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="*********"
                  onChangeText={setPassword}
                  secureTextEntry={true}
                  value={password}
                />
              </View>
            </View>
            <View style={styles.formFooter}>
              <TouchableOpacity style={styles.lostPasswordContainer}>
                <Text style={styles.lostPassword}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <LargeButton
            handlePress={() => {
              Haptics.selectionAsync();
              handleLogin();
            }}
          >
            Se connecter
          </LargeButton>

          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine}></View>
            <Text style={styles.separatorText}>Continuer avec</Text>
            <View style={styles.separatorLine}></View>
          </View>

          <View style={styles.socialsContainer}>
            <TouchableOpacity style={[styles.social, styles.socialFacebook]}>
              <Image
                style={styles.socialImage}
                source={require("../../../assets/images/static/facebook.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.social, styles.socialGoogle]}>
              <Image
                style={styles.socialImage}
                source={require("../../../assets/images/static/google.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.social, styles.socialApple]}>
              <Image
                style={styles.socialImage}
                source={require("../../../assets/images/static/apple.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.signinContainer}>
            <Text style={styles.signinPreText}>Pas encore de compte ? </Text>
            <TouchableOpacity style={styles.signinButton}>
              <Text style={styles.signinText}>Créer votre compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    gap: 20,
    zIndex: 40,

    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 30,
    paddingBottom: 50,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  illustration: {
    width: 200,
    height: 200,
    position: "absolute",
    zIndex: 50,
  },
  illustration1: {
    top: -170,
    left: 0,
  },
  illustration2: {
    top: -230,
    right: 0,
  },
  title: {
    color: colors.gray[600],
    fontWeight: "bold",
    fontSize: 18,
  },
  form: {
    gap: 12,
    alignSelf: "stretch",
  },
  formGroup: {
    gap: 10,
  },
  label: {
    color: colors.gray[600],
    fontSize: 14,
    fontWeight: 400,
  },
  inputGroup: {
    gap: 8,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.3,
    borderColor: colors.gray[100],
    borderRadius: 6,
  },
  inputImage: {
    width: 17,
    height: 17,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  formFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 4,
    borderWidth: 1.3,
    borderColor: colors.gray[600],
  },
  lostPasswordContainer: {},
  lostPassword: {
    color: colors.gray[400],
    fontSize: 12,
    fontWeight: 400,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  separatorLine: {
    height: 2,
    flex: 1,
    backgroundColor: colors.green[400],
  },
  separatorText: {
    color: colors.gray[600],
    fontSize: 12,
    fontWeight: 400,
  },
  socialsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  social: {
    padding: 10,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  socialFacebook: {
    backgroundColor: "#1877F2",
  },
  socialGoogle: {
    backgroundColor: colors.white,
  },
  socialApple: {
    backgroundColor: colors.black,
  },
  socialImage: {
    width: 24,
    height: 24,
  },
  signinContainer: {
    flexDirection: "row",
  },
  signinPreText: {
    fontSize: 12,
    color: colors.gray[600],
    fontWeight: 400,
  },
  signinButton: {},
  signinText: {
    fontSize: 12,
    color: colors.green[400],
    fontWeight: 400,
  },
});
