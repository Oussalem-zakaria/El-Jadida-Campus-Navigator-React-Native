import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { Button } from "./index";
import { listStyles } from "../../styles/pages/listStyles";
import { useAuth } from "../context/AuthContext";
import { Dialog, Icon } from "@rneui/themed";
import { deleteLocation } from "../services/geoApi/utils/geoLocations";
import { handleSignIn } from "../services/firebase/utils/handleSignIn";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function List({ navigation, data }) {
  const [isVisible, setIsVisible] = useState(true); // State to manage dialog visibility
  const { isAdmin } = useAuth();

  const handleDeleteLocation = async (id) => {
    console.log("TEST************");

    Alert.alert(
      "Confirmation de suppression", // "Confirm Deletion" in French
      "Êtes-vous sûr de vouloir supprimer cet emplacement ?", // "Are you sure you want to delete this location?" in French
      [
        {
          text: "Annuler", // "Cancel" in French
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await deleteLocation(id); // Call your deleteLocation function
              setIsVisible(false); // Hide dialog if successful
              Toast.show({
                type: "success",
                text1: "Succès 👋",
                text2: "Emplacement supprimé avec succès !",
                position: "top",
                visibilityTime: 5000,
                autoHide: true,
              });
            } catch (error) {
              console.error(
                "Erreur lors de la suppression de l'emplacement:",
                error
              );
              Toast.show({
                type: "success",
                text1: "Erreur 👋",
                text2:
                  "Échec de la suppression de l'emplacement. Veuillez réessayer.",
                position: "top",
                visibilityTime: 5000,
                autoHide: true,
              });
            }
          },
        },
      ]
    );
  };

  const confirmDeleteLocation = (id) => {
    deleteLocation(id); // Call your deleteLocation function when delete is confirmed
    setIsVisible(false); // Hide the dialog after deletion
  };

  const renderItem = ({ item }) => (
    <Animated.ScrollView style={styles.listItem}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.itemText}>{item.name}</Text>
        {isAdmin && (
          <TouchableOpacity onPress={() => handleDeleteLocation(item.id)}>
            <Icon name="delete" size={30} color={"red"} />
          </TouchableOpacity>
        )}
      </View>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={{
          display: "flex",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Image src={item.imageUrl} style={styles.image} />
      </Animated.View>
      <Text style={styles.description}>{item.description}</Text>
      <Button
        icon={"location"}
        name={"Voire"}
        onPress={() => navigation.navigate("Location", { location: item })}
      />
    </Animated.ScrollView>
  );

  return (
    <ImageBackground
      source={require("../../assets/images/bg.jpg")}
      style={styles.backgroundImage}
    >
      <FlatList
        data={data}
        style={styles.flatList}
        renderItem={({ item }) => renderItem({ item })}
      />
    </ImageBackground>
  );
}

const styles = listStyles;
