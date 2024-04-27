import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const startLocationUpdates = async (setUserLocation) => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Location permission denied");
      return;
    }

    const location = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High },
      (location) => {
        setUserLocation(location.coords);
        console.log("User Location: ", location.coords);
      }
    );

    return location;
  } catch (error) {
    console.error("Error starting location updates:", error);
  }
};

export const stopLocationUpdates = async (location) => {
  if (location) {
    await location
  }
};
