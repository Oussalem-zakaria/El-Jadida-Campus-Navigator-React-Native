import { Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { fetchRoute } from "./utils/fetchRoute";

const GeoapifyMapViewDirections = ({
  userLocation,
  destination,
  setDistance,
  setDuration,
}) => {
  const [route, setRoute] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    fetchRoute(
      userLocation,
      destination,
      setDistance,
      setDuration,
      setRoute,
      setInstructions
    );
  }, [destination, userLocation]);

  return (
    <>
      {route.length > 0 && (
        <Polyline
          coordinates={route[0].map((coord) => ({
            latitude: coord[1],
            longitude: coord[0],
          }))}
          strokeWidth={15}
          strokeColor="#0088cc"
          // lineDashPattern={[3]}
          // lineCap="round"
          // lineJoin="round"
        />
      )}

      {instructions.map(
        (instruction, index) => (
          console.log("Instrr", instruction),
          (
            <Marker
              key={index}
              coordinate={{
                latitude: instruction.location[1],
                longitude: instruction.location[0],
              }}
              title={instruction.text}
              description={instruction.text}
              pinColor="orange"
              image={require("../../../assets/images/step.png")}
            />
          )
        )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GeoapifyMapViewDirections;
