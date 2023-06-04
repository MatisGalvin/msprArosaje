import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux";

export const ProfileButton = () => {

    // TODO : Récupérer l'image dynamiquement avec l'utilisateur connecté et ouvrir le screen <PROFILE>


  const appStore = useSelector((state) => state.appStore);

    return <TouchableOpacity>
        <Image source={{uri: appStore.profile_picture}} style={styles.image} />
    </TouchableOpacity>

}

const styles = StyleSheet.create({
    image: {
        width: 38,
        height: 38,
        borderRadius: 50
    }
});