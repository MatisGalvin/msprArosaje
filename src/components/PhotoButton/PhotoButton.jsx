import { Image, StyleSheet, Text, View } from "react-native"
import colors from "../../../colors";
import { LinearGradient } from 'expo-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import * as Haptics from 'expo-haptics';

export const PhotoButton = ({image, handlePress = ()=>{}, children, append}) => {

    return <TouchableScale
        style={styles.body}
        onPress={() => {
            Haptics.selectionAsync();   
            handlePress();
        }}
        // activeScale={.95}
        friction={65}
    >
        <LinearGradient
            colors={[
                colors.green[400],
                colors.green[200]
            ]}
            start={{
                x: 0.5,
                y: 0
            }}
            end={{
                x: 1,
                y: 1
            }}
            style={styles.container}
        >
            <Text style={styles.text}>{children}</Text>
            {append}
        </LinearGradient>
    </TouchableScale>

}

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 2,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: colors.gray[600]
    },
    container: {
        borderRadius: 999,
        padding: 12
    },
    text: {
        color: colors.gray[600],
        fontSize: 16,
        fontWeight: 'bold'
    }
});