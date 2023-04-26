import { StyleSheet, Text, View } from "react-native"
import colors from "../../../colors";

export const Separator = () => {

    return <View style={styles.body} />

}

const styles = StyleSheet.create({
    body: {
        backgroundColor: colors.green[400],
        width: 2,
        height: 25
    }
});