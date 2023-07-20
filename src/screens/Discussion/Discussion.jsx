import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WrapperScreen } from "../../components/WrapperScreen/WrapperScreen";
import { Header } from "../../components/Header/Header";
import utilsStylesheet from "../../utils/utilsStylesheet";
import { useNavigation } from "@react-navigation/native";
// import socket from "../../utils/socket";
import { useEffect, useState } from "react";
import { selectOwnDiscussions } from "../../redux/reducers/appReducer";
import { useSelector } from "react-redux";
import DiscussionAPI from "../../api/Discussion";
import { selectID, selectJWT } from "../../redux/reducers/authReducer";
import store from "../../redux/appStore";
import colors from "../../../colors";
import SearchBar from "../../components/SearchBar/SearchBar";
import OnlineDot from "../../components/OnlineDot/OnlineDot";

export const Discussion = () => {
  const discussions = useSelector(selectOwnDiscussions);
  const userID = useSelector(selectID);
  const jwt = useSelector(selectJWT);

  const [ownDiscussions, setOwnDiscussions] = useState([]);

  const getOwnDiscussions = async () => {
    const discussions = await DiscussionAPI.getDiscussionsByUserId(userID, jwt);

    store.dispatch({ type: "INIT_OWN_PLANTS", plants: discussions.data });
    setOwnDiscussions(discussions.data);
  };

  useEffect(() => {
    if (discussions.length !== 0) {
      setOwnDiscussions(discussions);
    }

    getOwnDiscussions();
  }, []);

  useEffect(() => {
    // socket.emit("join", { idDiscussion: 1 });
  });

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
          <View style={utilsStylesheet.container}>
            <View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
              <Image
                style={{ width: 24, height: 24 }}
                source={require("../../../assets/images/static/chat.png")}
              />
              <Text
                style={
                  ({
                    fontSize: 16,
                    fontWeight: "bold",
                  },
                  styles.titleText)
                }
              >
                Discuter entre gardiens et propriétaires
              </Text>
            </View>
            <Text style={styles.paragraphText}>
              Attention, vous pourrez discuter avec eux seulement 7 jours avant
              et après la garde ! Cependant vous pourrez toujours consulter
              l’historique de la discussion
            </Text>
            <SearchBar
              textInputProps={{ placeholder: "Nom, Prénom, date..." }}
            />
            {ownDiscussions && (
              <FlatList
                renderItem={(data) => {
                  let destUser = data.item.attributes.user1;
                  if (data.item.attributes.user1.data.id == userID) {
                    destUser = data.item.attributes.user2;
                  }

                  const base64Image =
                    destUser.data.attributes.profile_picture.data.attributes
                      .base64;

                  return (
                    <View
                      style={{
                        gap: 8,
                        paddingVertical: 10,
                      }}
                    >
                      <TouchableOpacity
                        style={styles.containerDiscussion}
                        onPress={() =>
                          navigation.navigate("OneDiscussion", {
                            discussion: data.item,
                          })
                        }
                      >
                        <View style={{ height: 60, width: 60 }}>
                          <Image
                            source={{ uri: base64Image }}
                            style={{ width: 60, height: 60, borderRadius: 30 }}
                          />
                          <OnlineDot
                            isContactConnected={false}
                            customDotStylesheet={styles.dotStyleSheet}
                          />
                        </View>

                        <View>
                          <Text style={styles.userName}>
                            {destUser.data.attributes.username}
                          </Text>
                          <Text style={styles.textDate}>
                            Démarrée le{" "}
                            {new Date(
                              destUser.data.attributes.createdAt
                            ).toLocaleDateString("fr-FR")}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Image
                          source={require("../../../assets/images/static/calendar.png")}
                          style={styles.calendar}
                        />
                        <Text style={styles.expirationLabelStyle}>
                          8 jours avant expiration
                        </Text>
                      </View>
                    </View>
                  );
                }}
                data={ownDiscussions}
                keyExtractor={(item) => item.id}
                ListHeaderComponentStyle={{
                  alignItems: "stretch",
                  flexDirection: "row",
                }}
                style={[{ overflow: "hidden" }]}
              />
            )}
          </View>
        </View>
      </WrapperScreen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: colors.gray[600],
    fontWeight: "800",
    fontSize: 16,
  },
  paragraphText: {
    color: colors.gray[600],
    fontWeight: "400",
    fontSize: 14,
  },
  dotStyleSheet: {
    position: "absolute",
    bottom: -3,
    right: -3,
  },
  userName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray[600],
    lineHeight: 18,
  },
  containerDiscussion: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  textDate: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.gray[400],
    marginTop: 4,
  },
  expirationLabelStyle: {
    fontSize: 12,
    fontWeight: "200",
  },
  calendar: {
    height: 10,
    width: 10,
  },
});
