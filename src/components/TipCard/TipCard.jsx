import React from "react";
import {View, StyleSheet, Image, Text} from "react-native";

export default function TipCard(props) {
    return(
        <View style={{ overflow: 'visible', elevation: 4, padding: 4}}>
            <View
                style={styles.cardContainer}
            >
                <View style={{ width: "20%"}}>
                    <Image
                        source={require('../../../assets/images/static/woman-showing-thumbs-up.png')}
                        alt={"tip-img"}
                        style={{width: 76, height: 80}}
                    />
                </View>
                <View style={{ width: "65%", display: "flex", justifyContent: "center"}}>
                    <Text style={{fontSize: 14}}>{props.children}</Text>
                </View>
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

    }
})