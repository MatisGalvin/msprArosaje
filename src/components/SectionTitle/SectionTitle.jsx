import { Image, StyleSheet, Text, View } from "react-native"
import colors from "../../../colors";

export const SectionTitle = ({image, children}) => {

    return <View style={styles.body}>
        {image && <Image source={image} style={styles.image} />}
        <Text style={styles.text}>{children}</Text>
    </View>

}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'stretch',
        marginVertical: 7,
        paddingLeft: 5
    },
    image: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    text: {
        color: colors.gray[600],
        fontSize: 16,
        fontWeight: 'bold'
    }
});