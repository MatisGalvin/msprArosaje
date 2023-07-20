import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { WrapperScreen } from "../../components/WrapperScreen/WrapperScreen";
import { Header } from "../../components/Header/Header";
import utilsStylesheet from "../../utils/utilsStylesheet";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectID, selectJWT } from "../../redux/reducers/authReducer";
import socket from "../../utils/socket";
import { useEffect, useState } from "react";
import { LargeButton } from "../../components/LargeButton/LargeButton";
import Message from "../../api/Message";
import { HeaderDiscussion } from "../../components/HeaderDiscussion/HeaderDiscussion";
import MessageBubble from "../../components/MessageBubble/MessageBubble";
import MessageDate from "../../components/MessageDate/MessageDate";
import { Audio } from "expo-av";

const OneDiscussion = ({ route }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(false);
  const [recipientIsTyping, setRecipientIsTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sender, setSender] = useState(false);
  const [recipient, setRecipient] = useState(false);
  const [recipientOnline, setRecipientOnline] = useState(false);

  const navigation = useNavigation();

  const userID = useSelector(selectID);
  const jwt = useSelector(selectJWT);

  const discussionID = route.params.discussion.id;

  useEffect(() => {
    if (route.params.discussion.attributes.user1.data.id == userID) {
      setSender(route.params.discussion.attributes.user1.data);
      setRecipient(route.params.discussion.attributes.user2.data);
    } else {
      setSender(route.params.discussion.attributes.user2.data);
      setRecipient(route.params.discussion.attributes.user1.data);
    }
  }, []);

  const getMessages = async () => {
    const { data } = await Message.getMessagesByDiscussionID(discussionID, jwt);

    const allMessages = data.map((value) => {
      return {
        discussionID: value.attributes.discussion.data.id,
        sender: value.attributes.sender.data.id,
        recipient: value.attributes.sender.data.id,
        message: value.attributes.message,
        read: value.attributes.read,
        date: value.attributes.createdAt,
      };
    });

    setMessages([]);
  };

  useEffect(() => {
    if (messages) {
      return;
    }

    getMessages();
  }, []);

  useEffect(() => {
    socket.emit("join", { discussionID: discussionID });
  }, []);

  useEffect(() => {
    socket.on("recipientJoin", () => {
      // if(!recipientOnline) {
      //     socket.emit("join", { discussionID: discussionID });
      // }
      // console.log(true);
      setRecipientOnline(true);
    });

    socket.on("newMessage", (data) => {
    //   let newMessages = messages;
        console.log([...messages]);
    //   newMessages.push(data);
    //   setMessages(newMessages);
    });

    socket.on("recipientIsTyping", async (data) => {
      if (data.recipientIsTyping) {
        const { sound } = await Audio.Sound.createAsync(
          require("../../../assets/sounds/writing.wav")
        );
        await sound.playAsync();
      }

      setRecipientIsTyping(data.recipientIsTyping);
    });
  }, []);

  const handleNewMessage = () => {
    if (message == "") {
      return;
    }

    const newMessage = {
      discussionID: discussionID,
      sender: sender.id,
      recipient: recipient.id,
      message: message,
      date: new Date().toISOString(),
    };

    socket.emit("sendMessage", { newMessage: newMessage, jwt: jwt });

    setMessages([...messages, { ...newMessage, read: false }]);

    setMessage("");
  };

  useEffect(() => {
    if (message == "") {
      return;
    }

    if (!isTyping) {
      socket.emit("isTyping", { isTyping: true, discussionID: discussionID });
    }
    setIsTyping(true);

    const timeOutTyping = setTimeout(() => {
      socket.emit("isTyping", { isTyping: false, discussionID: discussionID });
      setIsTyping(false);
    }, 3000);

    return () => clearTimeout(timeOutTyping);
  }, [message]);

  if (!messages || !sender || !recipient) {
    return false;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "100%", height: "100%" }}
    >
      <WrapperScreen>
        <View style={{ flex: 1 }}>
          <HeaderDiscussion
            destinationUserName={recipient.attributes.username}
            // imageUser={{uri: }}
            handlePress={() => navigation.goBack()}
            customStylesheet={utilsStylesheet.containerPadding}
          />
          {recipientOnline && (
            <Text>{recipient.attributes.username} est en ligne</Text>
          )}
          <TextInput
            onChangeText={setMessage}
            style={{ borderWidth: 1, padding: 10, fontSize: 16 }}
            value={message}
          />
          <LargeButton handlePress={handleNewMessage}>Envoyer</LargeButton>

          {messages && (
            <FlatList
              renderItem={(data) => {
                if (data.index !== 0) {
                  var dateBefore = new Date(
                    messages[data.index - 1].date
                  ).getTime();
                  var dateNow = new Date(data.item.date).getTime();
                }

                if (typeof messages[data.index + 1] !== "undefined") {
                  var dateAfter = new Date(
                    messages[data.index + 1].date
                  ).getTime();
                }

                return (
                  <>
                    {(data.index == 0 ||
                      (data.index !== 0 &&
                        dateNow - dateBefore > 1000 * 60)) && (
                      <MessageDate date={data.item.date} />
                    )}
                    <View
                      key={data.index}
                      style={{
                        flexDirection: "row",
                        alignSelf: "stretch",
                        alignItems: "flex-end",
                        justifyContent:
                          data.item.sender == sender.id
                            ? "flex-end"
                            : "flex-start",
                        gap: 8,
                      }}
                    >
                      {data.item.sender != sender.id &&
                        ((data.index !== 0 &&
                          dateNow - dateBefore > 1000 * 60) ||
                        (typeof messages[data.index + 1] !== "undefined" &&
                          (messages[data.index + 1].sender !=
                            data.item.sender ||
                            dateAfter - dateNow > 1000 * 60)) ? (
                          <Image
                            style={{ width: 38, height: 38, borderRadius: 99 }}
                            source={{
                              uri: recipient.attributes.profile_picture.data
                                .attributes.base64,
                            }}
                          />
                        ) : (
                          <View style={{ width: 38, height: 38 }}></View>
                        ))}
                      <MessageBubble isMine={data.item.sender == sender.id}>
                        {data.item.message}
                      </MessageBubble>
                    </View>
                  </>
                );
              }}
              data={messages}
              keyExtractor={(data) => data.date}
              ListFooterComponent={() => {
                return (
                  recipientIsTyping && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "stretch",
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                        gap: 8,
                      }}
                    >
                      <Image
                        style={{ width: 38, height: 38, borderRadius: 99 }}
                        source={{
                          uri: recipient.attributes.profile_picture.data
                            .attributes.base64,
                        }}
                      />
                      <MessageBubble>
                        <Image
                          style={{
                            width: 28,
                            height: 15,
                          }}
                          source={require("../../../assets/images/static/typing.gif")}
                        />
                      </MessageBubble>
                    </View>
                  )
                );
              }}
              ListHeaderComponentStyle={{
                alignItems: "stretch",
                flexDirection: "row",
              }}
              contentContainerStyle={{
                alignItems: "stretch",
                gap: 8,
                padding: 16,
              }}
              style={{ overflow: "visible", alignSelf: "stretch" }}
            />
          )}
        </View>
      </WrapperScreen>
    </KeyboardAvoidingView>
  );
};

export default OneDiscussion;
