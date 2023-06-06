import { Image, StyleSheet, Text, View } from "react-native"
import colors from "../../../colors";

export const InformationSimple = ({image, children}) => {

    return <View style={styles.body}>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{children}</Text>
    </View>

}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    image: {
        width: 21,
        height: 21,
        resizeMode: 'contain',
    },
    text: {
        color: colors.gray[600],
        fontSize: 14,
        fontWeight: 'regular',
        flex: 1, flexWrap: 'wrap',
        maxWidth: '85%'
    }
});