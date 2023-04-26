import { Image, StyleSheet, View } from "react-native"
import colors from "../../../colors";

export const HeaderLogo = () => {

    return <View style={styles.body}>
        <Image source={require('../../../assets/images/static/house.png')} style={styles.image} />
    </View>

}

const styles = StyleSheet.create({
    body: {
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width: 38,
        height: 38,
        padding: 10,
        borderRadius: 12,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: colors.black,
        shadowRadius: 6,
        shadowOpacity: .1,
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
});