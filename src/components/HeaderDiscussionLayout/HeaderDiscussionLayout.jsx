import { StyleSheet, Text, View } from "react-native";
import colors from "../../../colors";
import { ProfileButton } from "../ProfileButton/ProfileButton";
import OnlineDot from "../OnlineDot/OnlineDot";

export default function HeaderDiscussionLayout({destinationUserName}) {
  return (
    <>
      <View
        style={{
          // borderColor: "red",
          // borderWidth: 1,
          height: 40,
          overflow: "visible",
        }}
      >
        <ProfileButton />
        <OnlineDot customDotStylesheet={styles.dotStyleSheet} />
      </View>

      <View style={styles.headerLables}>
        <Text style={styles.userNameStyle}>{destinationUserName}</Text>
        <Text style={styles.expirationLabelStyle}>
          8 jours avant expiration
        </Text>
      </View>
    </>
  );
}
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