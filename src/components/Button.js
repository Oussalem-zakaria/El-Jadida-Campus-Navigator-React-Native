import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export const Button = ({ icon ,name, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={icon} size={25} color="#0088cc" style={styles.icon} />
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F3F8FE",
    padding: 15,
    borderRadius: 5,
    borderColor: "#0088cc",
    borderWidth: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
buttonText: {
    fontSize: 16,
    color: "#0088cc",
    textAlign: "center",
    fontWeight: "bold",
},
});
