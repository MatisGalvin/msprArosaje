import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export const ProfileButton = () => {

    // TODO : Récupérer l'image dynamiquement avec l'utilisateur connecté et ouvrir le screen <PROFILE>

    return <TouchableOpacity>
        <Image source={require('../../../assets/images/static/account.png')} style={styles.image} />
    </TouchableOpacity>

}

const styles = StyleSheet.create({
    image: {
        width: 38,
        height: 38
    }
});