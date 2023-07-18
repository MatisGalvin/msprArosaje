import { StyleSheet, Text, View } from "react-native"
import { HeaderLogo } from "../HeaderLogo/HeaderLogo";
import colors from "../../../colors";
import { useNavigation } from "@react-navigation/native";


export const BigSimpleHeader = ({screenName, handlePress, customStylesheet}) => {
    const navigation = useNavigation();

    return <View style={[styles.body, customStylesheet]}>
        <View style={[styles.container, {gap: 8}]}>
            <HeaderLogo screenName={screenName} handlePress={handlePress} />
            <Text style={styles.titleText}>{screenName}</Text>
        </View>
    </View>

}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        zIndex: 99,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        color: colors.gray[600],
        fontWeight: '800',
        fontSize: 24
    }
});