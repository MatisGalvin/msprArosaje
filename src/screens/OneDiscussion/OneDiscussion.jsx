import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Touchable,
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
import { useEffect, useState, useRef } from "react";
import { LargeButton } from "../../components/LargeButton/LargeButton";
import Message from "../../api/Message";
import { MessageInput } from "../../components/MessageInput/MessageInput";
import Reactotron from 'reactotron-react-native'

const OneDiscussion = ({ route }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientIsTyping, setRecipientIsTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sender, setSender] = useState();
  const [recipient, setRecipient] = useState();
  const [recipientOnline, setRecipientOnline] = useState(false);

  const navigation = useNavigation();

  const userID = useSelector(selectID);
  const jwt = useSelector(selectJWT);

  const discussionID = route.params.discussion.id;

  const flatListRef = useRef(null);

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true }); // Step 2: Scroll the FlatList to the end
  };

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
    Reactotron.log("Messages reception");
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
        },
      ];
    });

    Reactotron.log("Messages recieved");
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <WrapperScreen>
        <View style={{ flex: 1 }}>
          <Header
            screenName="Discussion"
            handlePress={() => navigation.goBack()}
            customStylesheet={utilsStylesheet.containerPadding}
          />
          {recipientOnline && (
            <Text>{recipient.attributes.username} est en ligne</Text>
          )}
          {/* <TextInput
            onChangeText={setMessage}
            onChange={handleTyping}
            style={{ borderWidth: 1, padding: 10, fontSize: 16 }}
            value={message}
          />
          <LargeButton handlePress={handleNewMessage}>Envoyer</LargeButton> */}
          {recipientIsTyping && <Text>... est en train d'écrire</Text>}
          {messages && (
            <FlatList
              ref={flatListRef}
              renderItem={(data) => {
                return (
                  <View key={data.index} style={{ flexDirection: "row" }}>
                    {data.item.sender != sender.id && (
                      <Image
                        style={{ width: 60, height: 60 }}
                        source={{
                          uri: recipient.attributes.profile_picture.data
                            .attributes.base64,
                        }}
                      />
                    )}
                    <Text>{data.item.message}</Text>
                  </View>
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
                gap: 10,
              }}
              style={{ overflow: "visible" }}
              on
            />
          )}
        </View>
      </WrapperScreen>
      <MessageInput handlePress={handleNewMessage} />
    </KeyboardAvoidingView>
  );
};

export default OneDiscussion;
