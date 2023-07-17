import {
  FlatList,
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
// import socket from "../../utils/socket";
import { useEffect, useState } from "react";
import { selectOwnDiscussions } from "../../redux/reducers/appReducer";
import { useSelector } from "react-redux";
import DiscussionAPI from "../../api/Discussion";
import { selectID, selectJWT } from "../../redux/reducers/authReducer";
import store from "../../redux/appStore";

export const Discussion = () => {
  const discussions = useSelector(selectOwnDiscussions);
  const userID = useSelector(selectID);
  const jwt = useSelector(selectJWT);

  const [ownDiscussions, setOwnDiscussions] = useState([]);

  const getOwnDiscussions = async () => {
    const discussions = await DiscussionAPI.getDiscussionsByUserId(userID, jwt);

    store.dispatch({ type: "INIT_OWN_PLANTS", plants: discussions.data });
    setOwnDiscussions(discussions.data);

    console.log(discussions);
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
          {ownDiscussions && (
            <FlatList
              renderItem={(data) => {
                let destUser = data.item.attributes.user1;
                if(data.item.attributes.user1.data.id == userID) {
                    destUser = data.item.attributes.user2;
                }

                return (
                  <View>
                    <Text>{destUser.data.attributes.username}</Text>
                  </View>
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
              style={{ overflow: "visible" }}
            />
          )}
        </View>
      </WrapperScreen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({});
