import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
    container: {
      backgroundColor: "#eee",
      opacity: 0.9,
      flexGrow: 1,
      marginHorizontal: 15,
      marginVertical: 20,
      borderRadius: 10,
    },
    img: {
      width: 200,
      height: 200,
    },
    title1: {
      fontSize: 19,
      textAlign: "center",
      fontWeight: "bold",
      color: "black",
      marginTop: 4,
      marginBottom: "10%",
      paddingHorizontal: 25,
      lineHeight: 30,
    },
    text: {
      color: "black",
      fontWeight: "bold",
    },
    backgroundImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },
  });