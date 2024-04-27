import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { Marker, Polyline, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import GeoapifyMapViewDirections from "./GeoapifyMapViewDirections";
import { markers } from "../../../Data/markersData";
import { startLocationUpdates, stopLocationUpdates } from "./utils/userLocationUpdates";
import { zoomToUniversityRegion } from "./utils/geoLocations";

const MapViewComponent = ({ destinationLocation }) => {
  // const [userLocation, setUserLocation] = useState(null);
  console.log(destinationLocation);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [icon, setIcon] = useState(null);

  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });

  const goToDestination = () => {
    mapViewRef.current.animateToRegion({
      latitude: destination.latitude,
      longitude: destination.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  };

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = {
    latitude: 33.22552285325191,
    longitude: -8.486172297419388,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const mapViewRef = useRef(null);

  useEffect(() => {
    Toast.show({
      type: "info",
      text1: "Bienvenue 👋",
      text2: "Trouvez votre chemin vers votre destination",
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });

    const location = startLocationUpdates(setUserLocation)

    setDestination({
      latitude: destinationLocation.latitude,
      longitude: destinationLocation.longitude,
    });

    zoomToUniversityRegion(mapViewRef)

    return () => stopLocationUpdates(location);
  }, [destinationLocation]);

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          ref={mapViewRef}
          style={styles.map}
          initialRegion={INITIAL_POSITION}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsIndoorLevelPicker={true}
          mapType="satellite"
          oppressesScroll={true}
          pitchEnabled={true}
          pitch={45}
        >
          {/* Marker for user's location */}
          <Marker
            coordinate={userLocation}
            title="Ma localisation"
            description="Ma localisation"
          />
          {/* Marker for destination  */}

          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coords}
              title={marker.title}
              description={marker.description}
            >
              <Text
                style={{
                  color: "black",
                  backgroundColor: "#fff",
                  padding: 5,
                  borderRadius: 5,
                  fontSize: 10,
                }}
              >
                {marker.title}
              </Text>
              <Image source={marker.icon} style={styles.image} />
            </Marker>
          ))}

          <Marker
            coordinate={destination}
            title={destinationLocation.name}
            description={destinationLocation.description}
          >
            <Text
              style={{
                color: "black",
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              {destinationLocation.name}
            </Text>
            <Image source={require("../../../assets/images/icons/mark.png")} style={styles.image} />
            {/* <Image source={destinationLocation.icon} style={styles.image} /> */}
          </Marker>
          
          <GeoapifyMapViewDirections
            userLocation={userLocation}
            destination={destination}
            setDistance={setDistance}
            setDuration={setDuration}
          />

          {/* Circle representing the university region */}
          {/* <Circle
            center={universityRegion}
            radius={universityRegion.radius}
            strokeColor="rgba(0,0,255,0.5)"
            fillColor="rgba(0,0,255,0.2)"
          /> */}
        </MapView>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => goToDestination()}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            // marginHorizontal: 30,
            backgroundColor: "orange",
            borderRadius: 10,
            position: "absolute",
            bottom: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {destinationLocation.name} 📍
          </Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Distance: {distance} m
          </Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Durée: {(duration/60).toFixed(2)} min
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
  },
  image: {
    width: 60,
    height: 60
  },
});

export default MapViewComponent;
