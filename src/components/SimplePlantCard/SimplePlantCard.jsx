import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import colors from "../../../colors";
import base64 from 'react-native-base64'

export const SimplePlantCard = ({image, owner, name, description, handlePress = () => {}}) => {

    return <TouchableOpacity onPress={handlePress} style={styles.body}>
        <Image source={image} style={styles.image} />
        <View style={styles.container}>
            {owner && <Text style={styles.ownerText}>{owner}</Text>}
            <View style={styles.containerDetails}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.descriptionText} numberOfLines={2}>{description}</Text>
            </View>
        </View>
        <View style={styles.arrowContainer}>
            <Image source={require('../../../assets/images/static/right-arrow-padd.png')} style={styles.imageArrow} />
        </View>
    </TouchableOpacity>

}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 12,
        gap: 16,

        shadowColor: colors.black,
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: .15,
        shadowRadius: 15,
    },
    image: {
        width: 70,
        height: 55,
        alignSelf: 'stretch',
        resizeMode: 'cover',
        borderRadius: 6
    },
    container: {
        flex: 1,
        alignSelf: 'stretch',
        paddingRight: 20
    },
    ownerText: {
        fontSize: 12,
        color: colors.gray[400]
    },
    containerDetails: {
        gap: 4,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.gray[600]
    },
    descriptionText: {
        fontSize: 14,
        color: colors.gray[600],
        alignSelf: 'stretch',
    },
    arrowContainer: {
        position: 'absolute',
        top: '50%',
        right: 10,
        alignSelf: 'stretch',
    },
    imageArrow: {
        width: 24,
        height: 24,
        resizeMode: "contain"
    }
});