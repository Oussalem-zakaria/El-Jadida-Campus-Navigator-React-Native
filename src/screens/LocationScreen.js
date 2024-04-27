import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from the library
import { MapViewComponent } from "../services/index";

export default function LocationScreen({ navigation, route}) {
  const {location} = route.params;
  console.log("Location Screen",location)

  return (
    <View style={styles.container}>
      <MapViewComponent destinationLocation={location} navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
