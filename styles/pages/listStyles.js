import { StyleSheet } from "react-native";

export const listStyles = StyleSheet.create({
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
        textTransform: "capitalize"
      },
      description: {
        fontWeight: "300",
        fontSize: 16,
        paddingBottom: 10,
        marginBottom: "5%",
        textAlign: "center",
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