import { Image, StyleSheet, Text, View } from "react-native";
import { Tag } from "../Tag/Tag";
import { LargeButton } from "../LargeButton/LargeButton";
import colors from "../../../colors";
import { EditBtn } from "../EditBtn/EditBtn";


export default function ReportingCard({ owner, image, date, commentaires }) {

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <Tag image={require("../../../assets/images/static/shovel.png")}>
          {owner}
        </Tag>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.nameText}>Tous les commentaires</Text>
        {commentaires.map((item) => {
          return (
            <View key={item} style={styles.commentContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={item.picture}
                  style={styles.profilePic}
                />
              </View>
              <View style={styles.contentContainer}>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.nameComment}>{item.name} </Text>
                    <Text style={styles.hourComment}>{item.hour}</Text>
                </View>
                <Text style={styles.messageComment}>{item.message}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 12,

    shadowColor: colors.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  container: {
    alignSelf: "stretch",
    gap: 16,
  },
  image: {
    alignSelf: "stretch",
    width: "100%",
    height: undefined,
    aspectRatio: 1 / 0.85,
    borderRadius: 6,
  },
  addressContainer: {
    flexDirection: "row",
    gap: 8,
  },
  addressImage: {
    width: 19,
    height: 19,
  },
  addressTextWrapper: {
    borderBottomWidth: 1,
  },
  addressText: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.gray[600],
  },
  nameText: {
    color: colors.gray[600],
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionText: {
    color: colors.gray[600],
    fontSize: 14,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row"
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    paddingLeft: 5
  },
  imageContainer: {
    width: "10%",
  },
  profilePic: {
    width: 30,
    height: 30,
  },
  nameComment: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.gray[600]
  },
  hourComment: {
    fontSize: 12,
    fontWeight: "300",
    color: colors.gray[400]
  },
  messageComment: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.gray[600],
    marginTop: 3,
    // width: "80%"
  },
  dateText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.gray[600]
  }
});
