// Coordinates: [
//   [
//     [-8.486069, 33.226434],
//     [-8.486479, 33.226242],
//     [-8.486275, 33.226005],
//     [-8.486424, 33.225947],
//     [-8.486734, 33.225827],
//   ],
// ];

// Instructions: [
//   { location: [-8.486479, 33.226242], text: "Walk southwest on the walkway." },
//   { location: [-8.486275, 33.226005], text: "Turn left onto the walkway." },
//   { location: [-8.486424, 33.225947], text: "Turn right onto the walkway." },
//   { location: [-8.486734, 33.225827], text: "Keep left to take the walkway." },
//   {
//     location: [-8.486734, 33.225827],
//     text: "You have arrived at your destination.",
//   },
// ];

// import React, { useEffect, useState, useRef } from "react";
// import {
//   View,
//   StyleSheet,
//   Image,
//   Dimensions,
//   TouchableOpacity,
//   Text,
// } from "react-native";
// import MapView, { Marker, Polyline, Circle } from "react-native-maps";
// import * as Location from "expo-location";
// import { Ionicons } from "@expo/vector-icons";
// import Toast from "react-native-toast-message";
// import GeoapifyMapViewDirections from "./GeoapifyMapViewDirections";
// import { markers } from "../../Data/markersData";

// const MapViewComponent = ({ destinationLocation }) => {
//   // const [userLocation, setUserLocation] = useState(null);
//   console.log(destinationLocation);
//   const [userLocation, setUserLocation] = useState({
//     latitude: 33.22641092376572,
//     longitude: -8.4861137215751,
//   });

//   const [destination, setDestination] = useState({
//     latitude: 0,
//     longitude: 0,
//   });

//   const universityRegion = {
//     latitude: 33.22552285325191,
//     longitude: -8.486172297419388,
//     radius: 300,
//   };

//   const goToDestination = () => {
//     mapViewRef.current.animateToRegion({
//       latitude: destination.latitude,
//       longitude: destination.longitude,
//       latitudeDelta: 0.001,
//       longitudeDelta: 0.001,
//     });
//   };

//   const { width, height } = Dimensions.get("window");
//   const ASPECT_RATIO = width / height;
//   const LATITUDE_DELTA = 0.02;
//   const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
//   const INITIAL_POSITION = {
//     latitude: 33.22552285325191,
//     longitude: -8.486172297419388,
//     latitudeDelta: LATITUDE_DELTA,
//     longitudeDelta: LONGITUDE_DELTA,
//   };

//   const mapViewRef = useRef(null);

//   useEffect(() => {
//     Toast.show({
//       type: "info",
//       text1: "Bienvenue 👋",
//       text2: "Trouvez votre chemin vers votre destination",
//       position: "top",
//       visibilityTime: 3000,
//       autoHide: true,
//     });

//     /// Test the location

//     const getLocation = async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();

//         if (status === "granted") {
//           const location = await Location.getCurrentPositionAsync({});
//           setUserLocation(location.coords);
//           console.log("User Location: ", userLocation);
//           // Zoom to the university region after getting the user's location
//           zoomToUniversityRegion();
//         } else {
//           console.log("Location permission denied");
//         }
//       } catch (error) {
//         console.error("Error getting location:", error);
//       }
//     };

//     setDestination(destinationLocation.coords);

//     getLocation();
//   }, [destinationLocation]);

//   const zoomToUniversityRegion = () => {
//     if (mapViewRef.current) {
//       const edgePadding = { top: 50, right: 50, bottom: 50, left: 50 }; // Adjust padding as needed
//       const universityCircleCoordinates = [
//         {
//           latitude:
//             universityRegion.latitude + universityRegion.radius * 0.00001,
//           longitude:
//             universityRegion.longitude + universityRegion.radius * 0.00001,
//         },
//         {
//           latitude:
//             universityRegion.latitude - universityRegion.radius * 0.00001,
//           longitude:
//             universityRegion.longitude - universityRegion.radius * 0.00001,
//         },
//       ];
//       mapViewRef.current.fitToCoordinates(universityCircleCoordinates, {
//         edgePadding,
//         animated: true,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {userLocation && (
//         <MapView
//           ref={mapViewRef}
//           style={styles.map}
//           initialRegion={INITIAL_POSITION}
//           showsUserLocation={true}
//           showsMyLocationButton={true}
//           showsIndoorLevelPicker={true}
//           mapType="satellite"
//           oppressesScroll={true}
//           pitchEnabled={true}
//           pitch={45}
//         >
//           {/* Marker for user's location */}
//           <Marker
//             coordinate={userLocation}
//             title="Ma localisation"
//             description="Ma localisation"
//           />
//           {/* Marker for destination  */}

//           {markers.map((marker, index) => (
//             <Marker
//               key={index}
//               coordinate={marker.coords}
//               title={marker.title}
//               description={marker.description}
//             >
//               <Text style={{color: "black",backgroundColor:"#fff",padding:5,borderRadius:5}}>{marker.title}</Text>
//               <Image source={marker.icon} style={styles.image} />
//             </Marker>
//           ))}

//           <Marker
//             coordinate={destination}
//             title={destinationLocation.name}
//             description={destinationLocation.description}
//           >
//             <Text style={{color: "black",backgroundColor:"#fff",padding:10,borderRadius:10}}>{destinationLocation.name}</Text>
//             <Image source={destinationLocation.icon} style={styles.image} />
//           </Marker>
//           {/* Polyline for the path */}
//           {/* <Polyline
//             coordinates={[userLocation, destination]}
//             strokeWidth={12}
//             strokeColor="green"
//           /> */}

//           {/* <MapViewDirections
//             origin={userLocation}
//             destination={destination}
//             apikey={"AIzaSyBvdgnl0qUQWK7O3-0iGK5ElkfDonVUFGA"}
//             strokeWidth={5}
//             strokeColor="blue"
//           /> */}

//           <GeoapifyMapViewDirections
//             userLocation={userLocation}
//             destination={destination}
//           />

//           {/* Circle representing the university region */}
//           {/* <Circle
//             center={universityRegion}
//             radius={universityRegion.radius}
//             strokeColor="rgba(0,0,255,0.5)"
//             fillColor="rgba(0,0,255,0.2)"
//           /> */}
//         </MapView>
//       )}
//       <View style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
//       <TouchableOpacity
//         onPress={() => goToDestination()}
//         style={{
//           paddingVertical: 10,
//           paddingHorizontal: 10,
//           // marginHorizontal: 30,
//           backgroundColor: "orange",
//           borderRadius: 10,
//           position: "absolute",
//           bottom: 10,
//         }}
//       >
//         <Text style={{color:"white",fontWeight:"bold"}}>Destination</Text>
//       </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//     width: "100%",
//   },
//   image: {
//     width: 50,
//     height: 50,
//   },
// });

// export default MapViewComponent;

// import { Icon } from "@rneui/themed";
// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Image } from "react-native";
// import MapView, { Marker, Polyline } from "react-native-maps";

// const GeoapifyMapViewDirections = ({userLocation,destination  }) => {
//   const [route, setRoute] = useState([]);
//   const [instructions, setInstructions] = useState([]);

//   useEffect(() => {
//     const fetchRoute = async () => {
//       try {
//         console.log("User Location", destination.latitude, destination.longitude);
//         // const apiUrl = `https://api.geoapify.com/v1/routing?waypoints=33.22644063492463,-8.486073383218582|33.22628,-8.48726&mode=walk&apiKey=dff8015460ae470b9f9fce31a6f2e687`;
//         const apiUrl = `https://api.geoapify.com/v1/routing?waypoints=${userLocation.latitude},${userLocation.longitude}|${destination.latitude},${destination.longitude}&mode=walk&lang=fr&details=instruction_details&apiKey=dff8015460ae470b9f9fce31a6f2e687`;
//        console.log("API URL", apiUrl);
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         console.log("Data", data);
//         if (response.ok) {
//           const routeCoordinates = data.features[0].geometry.coordinates;
//           const routeInstructions =
//             data.features[0].properties.legs[0].steps.map((step) => ({
//               text: step.instruction.text,
//               location: routeCoordinates[0][step.to_index], // Assuming to_index represents the end point of the step
//             }));

//           setRoute(routeCoordinates);
//           console.log("Route", routeCoordinates);
//           setInstructions(routeInstructions);
//         } else {
//           throw new Error(data.message || "Error fetching route");
//         }
//       } catch (error) {
//         console.error("Error fetching route:", error);
//       }
//     };
//     fetchRoute();
//   }, [destination,userLocation]);

//   return (
//     <>
//       {/* <Polyline
//         coordinates={route[0].map((coord) => ({
//           latitude: coord[1],
//           longitude: coord[0],
//         }))}
//         strokeWidth={6}
//         strokeColor="blue"
//       /> */}
//       {route.length > 0 && (
//         <Polyline
//           coordinates={route[0].map((coord) => ({
//             latitude: coord[1],
//             longitude: coord[0],
//           }))}
//           strokeWidth={15}
//           strokeColor="green"
//           // lineDashPattern={[3]}
//           // lineCap="round"
//           // lineJoin="round"
//         />
//       )}

//       {instructions.map(
//         (instruction, index) => (
//           console.log("Instrr", instruction),
//           (
//             <Marker
//               key={index}
//               coordinate={{
//                 latitude: instruction.location[1],
//                 longitude: instruction.location[0],
//               }}
//               title={instruction.text}
//               description={instruction.text}
//               pinColor="orange"
//               image={require("../../assets/images/step.png")}
//             />
//           )
//         )
//       )}
//     </>
//     // <>
//     //   {route.length > 0 && (
//     //     <Polyline
//     //       coordinates={route[0].map((coord) => ({
//     //         latitude: coord[1],
//     //         longitude: coord[0],
//     //       }))}
//     //       strokeWidth={10}
//     //       strokeColor="blue"
//     //     />
//     //   )}

//       /* {instructions.map(
//         (instruction, index) => (
//           console.log("Instrr", instruction),
//           (
//             <Marker
//               key={index}
//               coordinate={{
//                 latitude: instruction.location[1],
//                 longitude: instruction.location[0],
//               }}
//               title={instruction.text}
//               description={instruction.text}
//             />
//           )
//         )
//       )} */
//     // </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default GeoapifyMapViewDirections;

