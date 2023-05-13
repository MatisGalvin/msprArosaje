import {Text, View, Image, StyleSheet} from "react-native";
import colors from "../../../colors";
export default function TipCard({img, date, name, content}){


    return(
        <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Image
                style={styles.avatarImage}
                source={img}
                />
            </View>
            <Text style={[styles.dateText, styles.colorText]}>{date}</Text>
            <Text numberOfLines={5} ellipsizeMode='tail' style={styles.colorText}>{content}</Text>
            <Text style={[styles.textName, styles.colorText]}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#F4FFF7FF",
        width: 187,
        borderRadius: 12,
        padding: 16,
        marginVertical: 10,

        shadowColor: '#000000',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: .15,
        shadowRadius: 15
    },
    imageContainer: {
        width: "100%"
    },
    avatarImage: {
        width: 76,
        height: 80,
        alignSelf: "center",
        resizeMode: "contain"
    },
    dateText: {
        fontWeight: "bold",
        marginVertical: 15
    },
    textName: {
        width: "100%",
        textAlign: "right",
        fontSize: 16,
        fontWeight: "600",
        marginTop: 10
    },
    colorText: {
        color: colors.gray[600]
    }
})