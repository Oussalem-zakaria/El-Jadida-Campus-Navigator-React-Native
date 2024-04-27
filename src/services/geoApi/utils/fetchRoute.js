import { useState } from "react";
import { API_KEY } from "../config";

export const fetchRoute = async (
  userLocation,
  destination,
  setDistance,
  setDuration,
  setRoute,
  setInstructions
) => {
  try {
    console.log("User Location", destination.latitude, destination.longitude);
    const apiUrl = `https://api.geoapify.com/v1/routing?waypoints=${userLocation.latitude},${userLocation.longitude}|${destination.latitude},${destination.longitude}&mode=walk&lang=fr&details=instruction_details&apiKey=${API_KEY}`;
    console.log("API URL", apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("Data", data);
    if (response.ok) {
      const routeCoordinates = data.features[0].geometry.coordinates;
      const routeInstructions = data.features[0].properties.legs[0].steps.map(
        (step) => ({
          text: step.instruction.text,
          location: routeCoordinates[0][step.to_index], // Assuming to_index represents the end point of the step
        })
      );

      setRoute(routeCoordinates);
      console.log("Route", routeCoordinates);
      setInstructions(routeInstructions);
      setDistance(data.features[0].properties.legs[0].distance);
      setDuration(data.features[0].properties.legs[0].time);
    } else {
      throw new Error(data.message || "Error fetching route");
    }
  } catch (error) {
    console.error("Error fetching route:", error);
  }
};
