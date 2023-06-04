import { Image, StyleSheet, Text, View } from "react-native"
import colors from "../../../colors";

export const Tag = ({image, children}) => {

    return <View style={styles.body}>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{children}</Text>
    </View>

}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        backgroundColor: colors.green[400],
        borderRadius: 9,
        gap: 6,
        padding: 4,
        paddingHorizontal: 5,
        alignSelf: 'flex-start',

        shadowColor: colors.black,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: .1,
        shadowRadius: 6,
    },
    image: {
        width: 16,
        height: 16
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.gray[600],
    }
});