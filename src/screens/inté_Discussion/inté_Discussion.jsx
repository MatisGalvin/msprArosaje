import { ScrollView, Text, View } from "react-native";
import { HeaderDiscussion } from "../../components/HeaderDiscussion/HeaderDiscussion";
import utilsStylesheet from "../../utils/utilsStylesheet";
import { useNavigation } from "@react-navigation/native";
import MyMessage from "../../components/MyMessage/MyMessage";
import OtherMessage from "../../components/OtherMessage/OtherMessage";
import MessageDate from "../../components/MessageDate/MessageDate";
import MessageBubble from "../../components/MessageBubble/MessageBubble";

export default function InteDiscussion() {

  const navigation = useNavigation()

    return(
        <View style={{ flex: 1 }}>
          <HeaderDiscussion
            destinationUserName="Karine Maldhio"
            handlePress={() => navigation.goBack()}
            customStylesheet={utilsStylesheet.containerPadding}
          />
          <ScrollView
            style={utilsStylesheet.containerPadding}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "start",
              gap: 10,
            }}
            showsVerticalScrollIndicator={false}
          >
            <MessageDate date="2023-07-17T09:47:32.311Z" />
            <MessageBubble isMine={true}>Let’s get lunch! How about pizza? 🍕</MessageBubble>
            <MessageBubble isMine={false}>Let’s get lunch! How about pizza? 🍕</MessageBubble>
            {/* <MyMessage>Let’s get lunch! How about pizza? 🍕</MyMessage>
            <OtherMessage>Let’s get lunch! How about pizza? 🍕</OtherMessage> */}
          </ScrollView>
        </View>
    )
}