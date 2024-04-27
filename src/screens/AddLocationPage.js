import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../../Data/firebase/config";
import { data } from "../../Data/data";
import Toast from "react-native-toast-message";
import { Button, Icon } from "@rneui/themed";
import { addLocationStyle } from "../../styles/pages/addLocationStyle";
import {
  pickImage,
  uploadImage,
} from "../services/ImagePicker/utils/imagePicker";

const AddLocationPage = ({ navigation }) => {
  const [locationName, setLocationName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleAddLocation = async () => {
    console.log("Image uploading...", image);
    try {
      let imageUrl = null; // Initialize imageUrl variable

      // Check if image is selected
      if (image) {
        // Upload image to Firebase Storage
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
        const ref = firebase.storage().ref().child(filename);
        await ref.put(blob);

        // Get the download URL of the uploaded image
        imageUrl = await ref.getDownloadURL();
        console.log("Image uploaded successfully:");
      }

      // Create location data object
      const locationData = {
        name: locationName,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        description: description,
        imageUrl: imageUrl, // Assign imageUrl
      };

      // Add location data to Firestore collection
      if (locationData.name === "") {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter a location name",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });
        return;
      }

      if (locationData.latitude === 0 || locationData.longitude === 0) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Please enter a valid latitude and longitude",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });
        return;
      }

      const docRef = await firebase
        .firestore()
        .collection("locations")
        .add(locationData);

      console.log("Location added successfully:", locationData);

      // Show success message
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "La localisation a été ajoutée avec succès!",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });

      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg2.jpg")}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.title}>Ajoutée une localisation</Text>
          <TextInput
            style={styles.input}
            placeholder="Location Name"
            value={locationName}
            onChangeText={setLocationName}
          />
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            keyboardType="numeric"
            value={latitude}
            onChangeText={setLatitude}
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            keyboardType="numeric"
            value={longitude}
            onChangeText={setLongitude}
          />
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Description"
            multiline
            value={description}
            onChangeText={setDescription}
          />
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => pickImage(setImage)}
          >
            <Icon name="image" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            {image && (
              <Image
                source={{ uri: image.uri }}
                style={{ width: 150, height: 150 }}
              />
            )}
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => uploadImage(image, setUploading)}
            >
              <Text style={styles.btnText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
          <Button
            title="Add Location"
            size="lg"
            containerStyle={{ width: "100%", borderRadius: 8 }}
            onPress={handleAddLocation}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = addLocationStyle;

export default AddLocationPage;
