import { Button } from "@rneui/themed";
import { Image, SectionList, StyleSheet, Text, View } from "react-native";
// import { data } from "../../Data/data";
import { Search, List } from "../components/index";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { firebase } from "../../Data/firebase/config";
import Toast from "react-native-toast-message";
import { Skeleton } from "@rneui/themed";
import { homeStyle } from "../../styles/pages/homeStyle";
import { fetchData } from "../services/firebase/utils/fetchData";

export default function HomeScreen({ navigation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    Toast.show({
      type: "info",
      text1: "Bienvenue 👋",
      text2: "Recherchez des lieux à visiter",
      position: "top",
      visibilityTime: 5000,
      autoHide: true,
    });
  }, []);

  useEffect(() => {
    // fetchLocations();
    fetchData("locations",setLocations);

    // const unsubscribeFocus = navigation.addListener("focus", () => {
    //   fetchLocations(); // Appel à fetchLocations pour s'assurer que les données sont mises à jour lors du retour sur l'écran
    // });
    // return () => unsubscribeFocus(); // Nettoyage de l'écouteur lors du démontage du composant
  }, [navigation]);

  const handleSearch = async (searchTerm) => {
    try {
      const capitalizedSearchTerm = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
      if (searchTerm === "") {
        fetchData("locations",capitalizedSearchTerm); // Si le terme de recherche est vide, récupérez toutes les données
        return;
      } else {
        const locationsSnapshot = await firebase
          .firestore()
          .collection("locations")
          .where("name", ">=", capitalizedSearchTerm)
          .where("name", "<=", capitalizedSearchTerm + "\uf8ff") // Utilisez "\uf8ff" comme fin de plage pour permettre la recherche par préfixe
          .get();

        console.log(locationsSnapshot.empty);
        if (locationsSnapshot.empty) {
          Toast.show({
            type: "info",
            text1: "warning",
            text2: "aucun données disponible",
            position: "top",
            visibilityTime: 5000,
            autoHide: true,
          });
          fetchData("locations",setLocations);
        } else {
          const filteredData = locationsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setLocations(filteredData);
        }
      }
    } catch (error) {
      console.error("Error searching locations:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Search data={locations} onSearch={handleSearch} />
      {locations.length === 0 && <Button title="Solid" type="solid" size="sm" loading />}
      {locations.length > 0 && (
        <List navigation={navigation} data={locations} />
      )}
    </View>
  );
}

const styles = homeStyle;
