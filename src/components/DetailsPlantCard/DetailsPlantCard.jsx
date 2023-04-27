import { Image, StyleSheet, Text, View } from "react-native"
import { Tag } from "../Tag/Tag";
import { LargeButton } from "../LargeButton/LargeButton";
import colors from "../../../colors";
import { EditBtn } from "../EditBtn/EditBtn";

export const DetailsPlantCard = ({image, owner, address, name, description, imageButton = false, textButton = false, handleButton = () => {}, handleEditBtn}) => {

    return <View style={styles.body}>
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <Tag image={require('../../../assets/images/static/profile.png')}>{owner}</Tag>
            <View style={styles.addressContainer}>
                <Image source={require('../../../assets/images/static/pin.png')} style={styles.addressImage} />
                <View style={styles.addressTextWrapper}>
                    <Text style={styles.addressText} under>{address}</Text>
                </View>
            </View>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
            {(imageButton && textButton && handleButton) && <LargeButton dark image={imageButton} handlePress={handleButton}>{textButton}</LargeButton>}
        </View>
        {handleEditBtn && <EditBtn handle={handleEditBtn} />}
    </View>
}

const styles = StyleSheet.create({
    body: {
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 12,

        shadowColor: colors.black,
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: .15,
        shadowRadius: 15,
    },
    container: {
        alignSelf: 'stretch',
        gap: 16,
    },
    image: {
        alignSelf: 'stretch',
        width: '100%',
        height: undefined,
        aspectRatio: 1/.85,
        borderRadius: 6
    },
    addressContainer: {
        flexDirection: 'row',
        gap: 8
    },
    addressImage: {
        width: 19,
        height: 19
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
        fontWeight: 'bold'
    },
    descriptionText: {
        color: colors.gray[600],
        fontSize: 14
    }
});