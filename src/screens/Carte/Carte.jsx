import { Animated, Dimensions, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as Haptics from "expo-haptics";
import CardMap from "../../components/CardMap/CardMap";
import { useEffect, useRef, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { Plants } from "../../api/Plants";
import { Tips } from "../../api/Tips";
import MarkersJson from "./Markers.json";

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
const CARD_WIDTH = widthScreen;
const SPACING_FOR_CARD_INSET = widthScreen * 0.1 - 10;

export default function Carte() {
  const _scrollView = useRef(null);
  const _map = useRef(null);

  const [allPlants, setAllPlants] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);

  const navigation = useNavigation();

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [fields, setFields] = useState([]);
  const [isMountedUsers, setIsMountedUsers] = useState(false);
  const [isMountedProducts, setIsMountedProducts] = useState(false);
  const [isMountedFields, setIsMountedFields] = useState(false);
  const [isMountedMarkers, setIsMountedMarkers] = useState(false);
  const [markers, setMarkers] = useState(MarkersJson);

  const [region, setRegion] = useState(initialRegion);

  function fetchPlants() {
    Plants.getPlantsDeep()
      .then((resultFetch) => {
        setAllPlants(resultFetch.data);
        setIsLoaded(true);
        setMarkers(resultFetch.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchPlants();
  }, []);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH);
      if (index >= allPlants.length) {
        index = allPlants.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinates } = allPlants[index];
          _map.current.animateToRegion(
            {
              ...coordinates,
              latitudeDelta: initialRegion.latitudeDelta,
              longitudeDelta: initialRegion.longitudeDelta,
            },
            350
          );

          Haptics.selectionAsync();
        }
      }, 10);
    });
  }, []);

  const interpolations = allPlants.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH;

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  return (
    <>
      <MapView
        ref={_map}
        initialRegion={initialRegion}
        style={StyleSheet.absoluteFill}
      >
        {allPlants.map((plant, index) => {
          const coordinates = {
            latitude: plant.attributes.owner.data.attributes.address[0].lat,
            longitude: plant.attributes.owner.data.attributes.address[0].long,
          };
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };

          return (
            <Marker
              key={index}
              coordinate={coordinates}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../../../assets/images/static/map_marker.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
      </MapView>
      {/* <SearchBar /> */}
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        // snapToAlignment="center"
        style={{
          position: "absolute",
          bottom: 10,
          overflow: "visible",
        }}
        contentInset={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        onScroll={Animated.event([{
            nativeEvent: {
                contentOffset: {
                    x: mapAnimation,
                }
            },
        }], {useNativeDriver: true})}
      >
        {allPlants.map((plant, index) => {
          return (
            <CardMap
              key={index}
              style={{
                width: CARD_WIDTH,
              }}
              name={plant.attributes.name}
              city={plant.attributes.owner.data.attributes.address[0].city}
              image={{ uri: plant.attributes.images.data[0].attributes.base64 }}
              plant={plant}
            />
          );
        })}
      </Animated.ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  marker: {
    width: 30,
    height: 30,
  },
});
