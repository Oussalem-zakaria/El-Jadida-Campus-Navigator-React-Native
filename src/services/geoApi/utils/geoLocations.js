import { firebase } from "../../../../Data/firebase/config";

export const zoomToUniversityRegion = (mapViewRef) => {
  const universityRegion = {
    latitude: 33.22552285325191,
    longitude: -8.486172297419388,
    radius: 300,
  };

  if (mapViewRef.current) {
    const edgePadding = { top: 50, right: 50, bottom: 50, left: 50 }; // Adjust padding as needed
    const universityCircleCoordinates = [
      {
        latitude: universityRegion.latitude + universityRegion.radius * 0.00001,
        longitude:
          universityRegion.longitude + universityRegion.radius * 0.00001,
      },
      {
        latitude: universityRegion.latitude - universityRegion.radius * 0.00001,
        longitude:
          universityRegion.longitude - universityRegion.radius * 0.00001,
      },
    ];
    mapViewRef.current.fitToCoordinates(universityCircleCoordinates, {
      edgePadding,
      animated: true,
    });
  }
};

export const deleteLocation = async (id) => {
  try {
    await firebase.firestore().collection("locations").doc(id).delete();
    console.log("Location deleted successfully");
    return true; // Indicate success
  } catch (error) {
    console.error("Error deleting location:", error);
    return false; // Indicate failure
  }
};
