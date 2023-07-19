import { Image, StyleSheet, Text, View } from "react-native";
import { HeaderLogo } from "../HeaderLogo/HeaderLogo";
import { NotificationButton } from "../NotificationButton/NotificationButton";
import { Separator } from "../Separator/Separator";
import { ProfileButton } from "../ProfileButton/ProfileButton";
import colors from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import ParametersButton from "../ParametersButton/ParametersButton";
import { MessageButton } from "../MessageButton/MessageButton";
import OnlineDot from "../OnlineDot/OnlineDot";
import HeaderDiscussionLayout from "../HeaderDiscussionLayout/HeaderDiscussionLayout";

export const HeaderDiscussion = ({
  destinationUserName,
  imageUser,
  handlePress,
  customStylesheet,
  showButtons = true,
  showParameters = false,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.body, customStylesheet]}>
      <View style={[styles.container, { gap: 8 }]}>
        <HeaderLogo
          handlePress={handlePress}
        />
        <HeaderDiscussionLayout destinationUserName={destinationUserName} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 20,
    zIndex: 99,
    borderBottomColor: colors.gray[600],
    borderBottomWidth: 1,
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
  headerLables: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 40,
  },
  userNameStyle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray[600],
  },
  expirationLabelStyle: {
    fontSize: 12,
    fontWeight: "200",
  },
  dotStyleSheet: {
    position: "absolute",
    bottom: -3,
    right: -3
  },
});
