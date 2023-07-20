import { StyleSheet, Text } from "react-native";
import colors from "../../../colors";
import formatDateMessage from "../../utils/formatDateMessage";

export default function MessageDate({date}) {

    return(
        <Text style={styles.text}>{formatDateMessage(date)}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: colors.gray[400],
        fontSize: 12,
        fontWeight: "400",
        textAlign: 'center',
        marginBottom: 8
    }
})