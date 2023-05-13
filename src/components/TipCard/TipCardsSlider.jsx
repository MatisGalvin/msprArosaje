import {Dimensions, FlatList, StyleSheet} from "react-native";
import TipCard from "./TipCard";
import {useState} from "react";

const DATA = [
    {
        "img": require("../../../assets/images/static/woman-showing-thumbs-up.png") ,
        "date": "15/03/2023",
        "name": "Greg C.",
        "content": "Je pense que les petites feuilles affaiblissent le reste de la plante, tu peux en couper une ou deux."
    },
    {
        "img": require("../../../assets/images/static/man-showing-thumbs-up.png"),
        "date": "15/03/2023",
        "name": "Greg C",
        "content": "Je pense que les petites feuilles affaiblissent le reste de la plante, tu peux en couper une ou deux."
    },
    {
        "img": require("../../../assets/images/static/female-farmer.png"),
        "date": "15/03/2023",
        "name": "Greg C",
        "content": "Je pense que les petites feuilles affaiblissent le reste de la plante, tu peux en couper une ou deux."
    }
]

const { width: screenWidth } = Dimensions.get('window');

export default function TipCardsSlider() {

    const [index, setIndex] = useState(0)

    const handleIndexChange = index => {
        setIndex(index);
    };

    const renderItem = ({ item }) => {
        return (
            <TipCard
                img={item.img}
                date={item.date}
                name={item.name}
                content={item.content}
                style={styles.slide}
            />
        );
    };


    return(
        <FlatList data={DATA}
                  renderItem={renderItem}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => `slide-${index}`}
                  contentContainerStyle={{
                      gap: 10
                  }}
                  style={{overflow: "visible"}}
                  // onMomentumScrollEnd={event => {
                  //     const newIndex = Math.round(
                  //         event.nativeEvent.contentOffset.x / screenWidth,
                  //     );
                  //     handleIndexChange(newIndex);
                  // }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    slide: {
        width: screenWidth,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
    },
    indicator: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        margin: 5,
    },
    activeIndicator: {
        backgroundColor: '#333',
    },
})