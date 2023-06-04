import { Image, StyleSheet, TouchableOpacity } from "react-native"
import colors from "../../../colors";

export const EditBtn = ({handle}) => {

    return <TouchableOpacity style={styles.body}>
        <Image source={require('../../../assets/images/static/pencil.png')} style={styles.image} />
    </TouchableOpacity>

}

const styles = StyleSheet.create({
    body: {
        position: 'absolute',
        top: 17,
        right: 17,
        backgroundColor: colors.gray[600],
        borderRadius: 12,
        padding: 10,

        shadowColor: colors.black,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: .1,
        shadowRadius: 6,
    },
    image: {
        width: 18,
        height: 18
    }
});