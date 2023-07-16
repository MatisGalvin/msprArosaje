import { StyleSheet, Text, View } from "react-native";
import { HeaderLogo } from "../HeaderLogo/HeaderLogo";
import { NotificationButton } from "../NotificationButton/NotificationButton";
import { Separator } from "../Separator/Separator";
import { ProfileButton } from "../ProfileButton/ProfileButton";
import colors from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import ParametersButton from "../ParametersButton/ParametersButton";
import { MessageButton } from "../MessageButton/MessageButton";

export const Header = ({
  screenName,
  handlePress,
  customStylesheet,
  showButtons = true,
  showParameters = false,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.body, customStylesheet]}>
      <View style={[styles.container, { gap: 8 }]}>
        <HeaderLogo screenName={screenName} handlePress={handlePress} />
        <Text style={styles.titleText}>{screenName}</Text>
      </View>
      {showButtons && (
        <View style={[styles.container, { gap: 16 }]}>
          <NotificationButton
          unread={3}
          handlePress={() => navigation.navigate("Notifications")}
        />
        <MessageButton
          unread={2}
          handlePress={() => navigation.navigate("Discussion")}
        />
          <Separator />
          {showParameters ? <ParametersButton /> : <ProfileButton />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    zIndex: 99,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    color: colors.gray[600],
    fontWeight: "800",
    fontSize: 18,
  },
});
