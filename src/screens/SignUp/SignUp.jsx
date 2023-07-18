import {
  Animated,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  SafeAreaView,
} from "react-native";
import { Header } from "../../components/Header/Header";
import { BigSimpleHeader } from "../../components/BigSimpleHeader/BigSimpleHeader";
import utilsStylesheet from "../../utils/utilsStylesheet";
import { LargeButton } from "../../components/LargeButton/LargeButton";
import colors from "../../../colors";
import Checkbox from "expo-checkbox";
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import { useEffect, useRef, useState } from "react";
import Auth from "../../api/Auth";
import * as Haptics from "expo-haptics";
import { dispatch } from "react-redux";
import { setSignIn } from "../../redux/reducers/authReducer";
import store from "../../redux/appStore";
import { Users } from "../../api/Users";
import { WrapperScreen } from "../../components/WrapperScreen/WrapperScreen";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isCGUSelected, setCGUSelection] = useState(false);
  const [isMLSelected, setMLSelection] = useState(false);
  const [colorCGU, setColorCGU] = useState(colors.green[400]);
  const [colorML, setColorML] = useState(colors.green[400]);

  const [errorUsernameMessage, setErrorUsernameMessage] = useState(false);

  const [errorEmailMessage, setErrorEmailMessage] = useState(false);
  const [errorPassWordRobustMessage, setErrorPasswordRobustMessage] =
    useState(false);
  const [errorPassWordSameMessage, setErrorPasswordSameMessage] =
    useState(false);
  const [errorCheckboxMessage, setErrorCheckboxMessage] = useState(false);

  const regexUserName = /^[a-zA-Z0-9_]{1,25}$/
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{12,}$/;

  const handleFieldsVerification = () => {

    if (!regexUserName.test(userName)) {
      setErrorUsernameMessage(true);
      return false;
    }

    if (!regexEmail.test(email)) {
      setErrorEmailMessage(true);
      return false;
    }
    if (!regexPassword.test(password)) {
      setErrorPasswordRobustMessage(true);
      return false;
    }
    if (password !== confirmationPassword) {
      setErrorPasswordSameMessage(true);
      return false;
    }
    if (!isCGUSelected || !isMLSelected) {
      setErrorCheckboxMessage(true);
      if (!isCGUSelected) {
        setColorCGU(colors.red[600]);
      }
      if (!isMLSelected) {
        setColorML(colors.red[600]);
      }
      return false;
    }
    setErrorEmailMessage(false);
    setErrorPasswordSameMessage(false);
    setErrorPasswordRobustMessage(false);
    setErrorCheckboxMessage(false);
    return true;
  };

  const handleSignUp = async () => {
    if (handleFieldsVerification() === true) {
      const authResponse = await Auth.localRegister(userName, email, password);

      if (!authResponse) {
        console.log("SignUp:handleSignUpAuthResponse", "error", authResponse);
        return;
      }

      if (!authResponse.jwt || !authResponse.user) {
        return;
      }

      const userResponse = await Users.findById(
        authResponse.user.id,
        authResponse.jwt
      );

      if (typeof userResponse[0] == "undefined") {
        console.log("SignUp:handleSignUpUserResponse", "error", userResponse);
        return;
      }

      if (!userResponse[0].id || userResponse[0].id !== authResponse.user.id) {
        console.log(
          "SignUp:handleSignUp",
          "error",
          !userResponse[0].id,
          userResponse[0].id !== authResponse.user.id
        );
        return;
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      store.dispatch({
        type: "setSignIn",
        isLoggedIn: true,
        id: authResponse.user.id,
        email: authResponse.user.email,
        username: authResponse.user.username,
        jwt: authResponse.jwt,
      });
    }
  };

  useEffect(() => {
    setColorCGU(colors.green[400]);
  }, [isCGUSelected]);

  useEffect(() => {
    setColorML(colors.green[400]);
  }, [isMLSelected]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          //   justifyContent: "space-between",
          paddingTop: 30,
        }}
      >
        <BigSimpleHeader
          screenName="Bienvenue !"
          customStylesheet={[utilsStylesheet.containerPadding, { zIndex: 50 }]}
        />

        <View style={styles.body}>
          <Image
            style={[styles.illustration, styles.illustration1]}
            source={require("../../../assets/images/static/signup_01.png")}
          />
          <Image
            style={[styles.illustration, styles.illustration2]}
            source={require("../../../assets/images/static/signup_02.png")}
          />

          <Text style={styles.title}>Créer un compte</Text>

          {/* <---------------------------- FORM ----------------------------> */}
          <View style={styles.form}>
            <Text style={styles.biggerLabel}>Profil</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Identifiant</Text>
              <View
                style={[
                  styles.inputGroup,
                  errorUsernameMessage && { borderColor: colors.red[500] },
                ]}
              >
                <Image
                  style={[
                    styles.inputImage,
                    errorUsernameMessage && { tintColor: colors.red[500] },
                  ]}
                  source={require("../../../assets/images/static/profile.png")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="JohnDoe"
                  onChangeText={(text) => {
                    setErrorUsernameMessage(false);
                    setUserName(text)
                  }}
                  value={userName}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {errorUsernameMessage && (
              <Text style={styles.error}>
                Votre nom d'utilisateur n'est pas valide. Ce dernier ne doit comporter que des caractères alphanumériques sans accents ni espaces.
              </Text>
            )}


            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <View
                style={[
                  styles.inputGroup,
                  errorEmailMessage && { borderColor: colors.red[500] },
                ]}
              >
                <Image
                  style={[
                    styles.inputImage,
                    errorEmailMessage && { tintColor: colors.red[500] },
                  ]}
                  source={require("../../../assets/images/static/message.png")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="johndoe@mail.com"
                  onChangeText={(text) => {
                    setErrorEmailMessage(false);
                    setEmail(text);
                  }}
                  value={email}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {errorEmailMessage && (
              <Text style={styles.error}>
                Votre adresse email n'est pas valide.
              </Text>
            )}

            <Text style={[styles.biggerLabel, { marginTop: 20 }]}>
              Mot de passe
            </Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <View
                style={[
                  styles.inputGroup,
                  errorPassWordRobustMessage && {
                    borderColor: colors.red[500],
                  },
                ]}
              >
                <Image
                  style={[
                    styles.inputImage,
                    errorPassWordRobustMessage && {
                      tintColor: colors.red[500],
                    },
                  ]}
                  source={require("../../../assets/images/static/lock.png")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="*********"
                  onChangeText={(text) => {
                    setErrorPasswordRobustMessage(false);
                    setErrorPasswordSameMessage(false);
                    setPassword(text);
                  }}
                  secureTextEntry={true}
                  value={password}
                  autoCapitalize="none"
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Confirmation de mot de passe</Text>
              <View
                style={[
                  styles.inputGroup,
                  (errorPassWordRobustMessage || errorPassWordSameMessage) && {
                    borderColor: colors.red[500],
                  },
                ]}
              >
                <Image
                  style={[
                    styles.inputImage,
                    (errorPassWordRobustMessage ||
                      errorPassWordSameMessage) && {
                      tintColor: colors.red[500],
                    },
                  ]}
                  source={require("../../../assets/images/static/lock.png")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="*********"
                  onChangeText={(text) => {
                    setErrorPasswordRobustMessage(false);
                    setErrorPasswordSameMessage(false);
                    setConfirmationPassword(text);
                  }}
                  secureTextEntry={true}
                  value={confirmationPassword}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {errorPassWordRobustMessage && (
              <Text style={styles.error}>
                Votre mot de passe doit contenir 12 caractères minimum
                comprenant des minuscules, des majuscules et des caractères
                spéciaux.
              </Text>
            )}

            {errorPassWordSameMessage && (
              <Text style={styles.error}>
                Veillez à confirmer avec le même mot de passe.
              </Text>
            )}

            <View style={styles.checkBoxForm}>
              <Checkbox
                value={isCGUSelected}
                onValueChange={setCGUSelection}
                color={colorCGU}
              />
              <Text style={styles.textCheckBox}>
                En cochant cette case, je reconnais avoir pris connaissance et
                accepte les{" "}
                <Text
                  style={styles.checkBoxLinks}
                  onPress={() =>
                    Linking.openURL("https://www.arosaje.com/conditions-generales-dutilisation")
                  }
                >
                  conditions générales d'utilisation
                </Text>{" "}
                régissant l'accès et l'utilisation du présent service, y compris
                les droits et obligations des utilisateurs, la propriété
                intellectuelle, la confidentialité des données et les
                limitations de responsabilité.
              </Text>
            </View>

            <View style={styles.checkBoxForm}>
              <Checkbox
                value={isMLSelected}
                onValueChange={setMLSelection}
                color={colorML}
              />
              <Text style={styles.textCheckBox}>
                En cochant cette case, j'accepte les{" "}
                <Text
                  style={styles.checkBoxLinks}
                  onPress={() =>
                    Linking.openURL("https://www.arosaje.com/mentions-legales")
                  }
                >
                  mentions légales
                </Text>{" "}
                relatives à l'utilisation de ce service, y compris les
                dispositions légales sur la protection des données personnel.
              </Text>
            </View>
          </View>
          {/* <---------------------------- END FORM ----------------------------> */}

          {errorCheckboxMessage && (
            <Text style={styles.error}>
              Merci d'accepter toutes les conditions pour créer votre compte.
            </Text>
          )}

          <LargeButton
            handlePress={() => {
              Haptics.selectionAsync();
              handleSignUp();
            }}
          >
            Créer mon compte
          </LargeButton>
        </View>
      </ScrollView>
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
    paddingBottom: 100,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    marginTop: 220,
  },
  illustration: {
    position: "absolute",
    zIndex: 50,
  },
  illustration1: {
    width: 179,
    height: 179,
    top: -150,
    left: 0,
  },
  illustration2: {
    width: 200,
    height: 200,
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
  biggerLabel: {
    color: colors.gray[600],
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
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
  error: {
    color: colors.red[500],
    textAlign: "justify",
  },
  errorLink: {
    textDecorationLine: "underline",
    textDecorationColor: colors.red[500],
  },
  checkBoxForm: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  textCheckBox: {
    marginHorizontal: 10,
    color: colors.gray[600],
  },
  checkBoxLinks: {
    textDecorationLine: "underline",
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
