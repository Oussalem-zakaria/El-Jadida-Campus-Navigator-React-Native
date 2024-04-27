import { FlatList, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button,EventCheckBox } from "./index";
import { useState } from "react";

export default function Events({ navigation, data }) {
    const renderItem = ({ item }) => (
      <View style={styles.listItem}>
          <View style={{display: "flex",justifyContent:"space-between", flexDirection: "row"}}>
            <Text style={styles.itemText}>{item.name}</Text>
            <EventCheckBox/>
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Image source={item.image} style={styles.image} />
          </View>
          <Text style={styles.description}>
            {item.description.substring(0, 50)} ...
          </Text>
          <Button
            icon={"book"}
            name={"Lire plus"}
            // onPress={() => navigation.navigate("Location", { location: item })}
          />
        </View>
    );

  return (
    <ImageBackground
      source={require("../../assets/images/bg2.jpg")}
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

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  listItem: {
    paddingVertical: 10,
    zIndex: 1,
    opacity: 0.95,
    paddingHorizontal: 15,
    marginVertical: 4,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 19,
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
    marginTop: 4,
    marginBottom: "10%",
  },
  description: {
    fontWeight: "300",
    fontSize: 16,
    paddingBottom: 10,
    marginBottom: "5%",
    textAlign: "left",
  },
  image: {
    width: 350, // Adjust the width as needed
    height: 250, // Adjust the height as needed
    resizeMode: "center",
    marginBottom: "5%",
    borderRadius: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
