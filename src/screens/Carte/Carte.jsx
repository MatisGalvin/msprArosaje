import {
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import MapView from "react-native-maps";
import CardMap from "../../components/CardMap/CardMap";
import { useRef } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
  latitude: 44.8355343,
  longitude: -0.5827342,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const widthScreen = Dimensions.get("window").width;
const heightScreen = Dimensions.get("window").height;

const CARD_HEIGHT = 285;
const CARD_WIDTH = widthScreen * 0.8 + 20;
const SPACING_FOR_CARD_INSET = widthScreen * 0.1 - 10;

export default function Carte() {
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const _scrollView = useRef(null);

  return (
    <>
      <MapView initialRegion={initialRegion} style={StyleSheet.absoluteFill} />
      <SearchBar />
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        snapToAlignment="center"
        style={{
          position: "absolute",
          bottom: 10,
          overflow: "visible",
        }}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
      >
        <CardMap
          style={{
            width: CARD_WIDTH,
            marginLeft: 10,
          }}
          name="Montserra"
          city="Bordeaux"
          image={require("../../../assets/images/examples/montserrat-deliciosa.jpg")}
        />

        <CardMap
          style={{
            width: CARD_WIDTH,
            marginLeft: 10,
          }}
          name="Montserra"
          city="Bordeaux"
          image={require("../../../assets/images/examples/montserrat-deliciosa.jpg")}
        />

        <CardMap
          style={{
            width: CARD_WIDTH,
            marginLeft: 10,
          }}
          name="Montserra"
          city="Bordeaux"
          image={require("../../../assets/images/examples/montserrat-deliciosa.jpg")}
        />
      </Animated.ScrollView>
    </>
  );
}
