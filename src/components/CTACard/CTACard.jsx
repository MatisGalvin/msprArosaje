import { useEffect, useRef } from "react";
import { LargeButton } from "../LargeButton/LargeButton";
import { Image, StyleSheet, Text, View } from "react-native";

export const CTACard = ({image, title, content, imageButton, textButton, handlePressButton = () => {}}) => {
  
    return (
        <View style={styles.body}>
            { image && <Image source={image} alt="test" style={styles.image} /> }
            <View style={styles.container}>
                {title && <Text style={styles.title}>{title}</Text>}
                {content && <Text style={styles.content}>{content}</Text>}
                {(imageButton && textButton) && <LargeButton image={imageButton} handlePress={handlePressButton}>{textButton}</LargeButton>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        alignSelf: 'stretch',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        marginTop: 24,
        marginBottom: 15,

        shadowColor: '#000000',
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: .15,
        shadowRadius: 15
    },
    image: {
        marginTop: -50,
        width: 108,
        height: 108
    },
    container: {
        gap: 10,
        padding: 16
    },
    title: {
        textAlign: 'center',
        color: '#4B5563',
        fontSize: 18,
        fontWeight: 'bold'
    },
    content: {
        color: '#4B5563',
        textAlign: 'center',
        fontSize: 14
    }
});