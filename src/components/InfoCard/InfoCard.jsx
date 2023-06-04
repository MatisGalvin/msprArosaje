import React from "react";
import {View, StyleSheet, Image, Text} from "react-native";
import colors from "../../../colors";

export const InfoCard = ({ children = () => {} }) => {
    return(
            <View
                style={styles.cardContainer}
            >
                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../../../assets/images/static/woman-showing-thumbs-up.png')}
                        alt={"tip-img"}
                        style={styles.imageStyle}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.textStyle, styles.colorText]}>{children}</Text>
                </View>
            </View>

    )
}

const styles = StyleSheet.create({
    cardContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: "100%",
        borderRadius: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignSelf: "center",
        backgroundColor: "#F4FFF7FF",

        shadowColor: '#000000',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: .15,
        shadowRadius: 15

    },
    avatarContainer: {
        width: "20%"
    },
    imageStyle: {
        width: 76,
        height: 80
    },
    textContainer: {
        width: "65%",
        display: "flex",
        justifyContent: "center"
    },
    textStyle: {
        fontSize: 14
    },
    colorText: {
        color: colors.gray[600]
    }
})