import { useEffect, useRef } from "react";
import { LargeButton } from "../LargeButton/LargeButton";
import { Image, StyleSheet, Text, View } from "react-native";

export const CTACard = ({image, title, content, imageButton, textButton, handlePressButton}) => {
  
    return (
        <View style={styles.container}>
            { image && <Image source={image} alt="test" style={styles.image} /> }
            <View space={3} p={6} alignSelf={"stretch"}>
                {title && <Text textAlign={"center"} color={"gray.600"} size="md">{title}</Text>}
                {content && <Text fontSize="sm" color={"gray.600"} textAlign={"center"}>{content}</Text>}
                {/* {(imageButton && textButton) && <LargeButton image={imageButton} handlePress={handlePressButton}>{textButton}</LargeButton>} */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'stretch',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        marginTop: 24,

        shadowColor: '#000000',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: .15,
        shadowRadius: 15
    },
    image: {
        marginBottom: 4,
        marginTop: -50,
        width: 108,
        height: 108
    }
});