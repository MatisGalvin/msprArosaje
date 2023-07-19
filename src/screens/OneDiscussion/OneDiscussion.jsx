import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
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
    const allMessages = await Message.getMessagesByDiscussionID(
      discussionID,
      jwt
    );

    let newAllMessages = [];

    allMessages.data.forEach((value, index) => {
      newAllMessages = [
        ...newAllMessages,
        {
          discussionID: value.attributes.discussion.data.id,
          sender: value.attributes.sender.data.id,
          recipient: value.attributes.sender.data.id,
          message: value.attributes.message,
          read: value.attributes.read,
          date: value.attributes.createdAt,
        },
      ];
    });

    setMessages(newAllMessages);
  };

  useEffect(() => {
    if (messages.length > 0) {
      return;
    }

    getMessages();
  }, []);

  useEffect(() => {
    socket.emit("join", { discussionID: discussionID });
  }, []);

  socket.on("recipientJoin", () => {
    // if(!recipientOnline) {
    //     socket.emit("join", { discussionID: discussionID });
    // }
    // console.log(true);
    setRecipientOnline(true);
  });

  socket.on("newMessage", (data) => {
    setMessages([...messages, data]);
  });

  socket.on("recipientIsTyping", (data) => {
    setRecipientIsTyping(data.recipientIsTyping);
  });

  const handleNewMessage = () => {
    if (message == "") {
      return;
    }

    const newMessage = {
      discussionID: discussionID,
      sender: sender.id,
      recipient: recipient.id,
      message: message,
    };

    socket.emit("sendMessage", { newMessage: newMessage, jwt: jwt });

    setMessages([...messages, { ...newMessage, read: false }]);

    setMessage("");
  };

  const handleTyping = () => {
    clearTimeout(timeOutTyping);
    setIsTyping(true);
    if (!isTyping) {
      socket.emit("isTyping", { isTyping: true, discussionID: discussionID });
    }

    var timeOutTyping = setTimeout(() => {
      socket.emit("isTyping", { isTyping: false, discussionID: discussionID });
      setIsTyping(false);
    }, 3000);
  };

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
            handlePress={() => navigation.goBack()}
            customStylesheet={utilsStylesheet.containerPadding}
          />
          {recipientOnline && (
            <Text>{recipient.attributes.username} est en ligne</Text>
          )}
          <TextInput
            onChangeText={setMessage}
            onChange={handleTyping}
            style={{ borderWidth: 1, padding: 10, fontSize: 16 }}
            value={message}
          />
          <LargeButton handlePress={handleNewMessage}>Envoyer</LargeButton>
          {recipientIsTyping && <Text>... est en train d'écrire</Text>}
          {messages && (
            <FlatList
              renderItem={(data) => {
                if (data.index !== 0) {
                  var dateBefore = new Date(
                    messages[data.index - 1].date
                  ).getTime();
                  var dateNow = new Date(data.item.date).getTime();
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
                      style={{ flexDirection: "row", alignSelf: "stretch", alignItems: 'flex-end', justifyContent: data.item.sender == sender.id ? 'flex-end' : 'flex-start', gap: 8 }}
                    >
                      {data.item.sender != sender.id && (
                        (messages[data.index + 1].sender != data.item.sender ? <Image
                          style={{ width: 38, height: 38, borderRadius: 99 }}
                          source={{
                            uri: recipient.attributes.profile_picture.data
                              .attributes.base64,
                          }}
                        /> : <View style={{width: 38, height: 38}}></View>)
                      )}
                      <MessageBubble isMine={data.item.sender == sender.id}>
                        {data.item.message}
                      </MessageBubble>
                    </View>
                  </>
                );
              }}
              data={messages}
              //   keyExtractor={(data) => Math.random()*1000}
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
