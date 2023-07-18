import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
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
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("OneDiscussion", {
                          discussionId: data.item.id,
                        })
                      }
                    >
                      <Image
                        source={{ uri: base64Image }}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                      />

                      <Text>{destUser.data.attributes.username}</Text>
                    </TouchableOpacity>
                  );
                }}
                data={ownDiscussions}
                keyExtractor={(item) => item.id}
                ListHeaderComponentStyle={{
                  alignItems: "stretch",
                  flexDirection: "row",
                }}
                contentContainerStyle={{
                  alignItems: "stretch",
                  gap: 10,
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
});
