import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { Icon } from "@rneui/themed";
import AdminCard from "../components/AdminCard";
import { adminStyles } from "../../styles/pages/adminStyles";

const AdminPage = ({ navigation }) => {
  const handleLogout = () => {
    // Logic to handle logout
    navigation.navigate("Login"); // Assuming you have a 'Login' screen
  };

  const handleAddLocation = () => {
    // Logic to navigate to the page for adding a location
    navigation.navigate("AddLocation"); // Assuming you have a 'AddLocation' screen
  };

  const handleAddEvent = () => {
    // Logic to navigate to the page for adding an event
    // navigation.navigate("AddEvent"); // Assuming you have a 'AddEvent' screen
  };

  const handleAddUser = () => {
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg2.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.cardContainer}>
        <Text style={styles.title}>Admin Dashboard</Text>
          <AdminCard
            iconName="add"
            title="Add Location"
            onPress={handleAddLocation}
          />
          <AdminCard
            iconName="add"
            title="Add Event"
            onPress={handleAddEvent}
          />
          <AdminCard iconName="add" title="Add User" onPress={handleAddUser} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = adminStyles;

export default AdminPage;
