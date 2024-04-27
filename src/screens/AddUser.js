// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   ImageBackground,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { firebase } from "../../Data/firebase/config";
// import { data } from "../../Data/data";
// import Toast from "react-native-toast-message";
// import { Button, Icon } from "@rneui/themed";
// import { addLocationStyle } from "../../styles/pages/addLocationStyle";
// import {
//   pickImage,
//   uploadImage,
// } from "../services/ImagePicker/utils/imagePicker";

// const AddUser = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleAddUser = async () => {
//     try {
//       // Add location data to Firestore collection
//       if (email.name === "") {
//         Toast.show({
//           type: "error",
//           text1: "Error",
//           text2: "Please enter a location email",
//           position: "top",
//           visibilityTime: 3000,
//           autoHide: true,
//         });
//         return;
//       }

//       if (password === "") {
//         Toast.show({
//           type: "error",
//           text1: "Error",
//           text2: "Please enter a valid password",
//           position: "top",
//           visibilityTime: 3000,
//           autoHide: true,
//         });
//         return;
//       }

//       await firebase
//         .firestore()
//         .collection("users")
//         .add({
//           email: email,
//           roles: ["user"],
//           // Add additional user data as needed
//         });

//       // Show success message
//       Toast.show({
//         type: "success",
//         text1: "Success",
//         text2: "user a été ajoutée avec succès!",
//         position: "top",
//         visibilityTime: 3000,
//         autoHide: true,
//       });

//       // Navigate back to the previous screen
//       navigation.goBack();
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }
//   };

//   return (
//     <ImageBackground
//       source={require("../../assets/images/bg2.jpg")}
//       style={styles.backgroundImage}
//     >
//       <ScrollView style={styles.container}>
//         <View style={styles.cardContainer}>
//           <Text style={styles.title}>Ajoutée une localisation</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="email"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="password"
//             keyboardType="numeric"
//             value={password}
//             onChangeText={setPassword}
//           />

//           <Button
//             title="Add User"
//             size="lg"
//             containerStyle={{ width: "100%", borderRadius: 8 }}
//             onPress={handleAddUser}
//           />
//         </View>
//       </ScrollView>
//     </ImageBackground>
//   );
// };

// const styles = addLocationStyle;

// export default AddUser;
