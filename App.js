import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { NavigationContainer } from "@react-navigation/native";
import * as Location from "expo-location";
import AppNavigator from "./src/navigation/AppNavigator";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from the library
import { ProfileScreen } from "./src/screens";
import { AuthProvider } from "./src/context/AuthContext";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "1rem 1rem",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  icon: {},
});
