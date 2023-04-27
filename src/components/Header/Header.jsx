import { StyleSheet, Text, View } from "react-native"
import { HeaderLogo } from "../HeaderLogo/HeaderLogo";
import { NotificationButton } from "../NotificationButton/NotificationButton";
import { Separator } from "../Separator/Separator";
import { ProfileButton } from "../ProfileButton/ProfileButton";
import colors from "../../../colors";
import { useNavigation } from "@react-navigation/native";


export const Header = ({screenName}) => {
    const navigation = useNavigation();

    return <View style={styles.body}>
        <View style={[styles.container, {gap: 8}]}>
            <HeaderLogo />
            <Text style={styles.titleText}>{screenName}</Text>
        </View>
        <View style={[styles.container, {gap: 16}]}>
            <NotificationButton unread={3} handlePress={() => navigation.navigate('Notifications')} />
            <Separator />
            <ProfileButton />
        </View>
    </View>

}

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        color: colors.gray[600],
        fontWeight: '800',
        fontSize: 18
    }
});