import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { firebase } from "../../Data/firebase/config";
import { TextInput } from "react-native-gesture-handler";
import { Button, Icon, Input } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import { ToastAndroid } from "react-native";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { SingupStyles } from "../../styles/auth/signup";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  useEffect(() => {
    Toast.show({
      type: "info",
      text1: "Bienvenue 👋",
      text2: "Créez votre compte dès maintenant !",
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  }, []);

  const handleSignUp = async () => {
    try {
      // Check if the email ends with "@ucd.ac.ma"
      if (email && !email.toLowerCase().endsWith("@ucd.ac.ma")) {
        Toast.show({
          type: "error",
          text1: "Adresse e-mail non valide",
          text2:
            "Veuillez saisir une adresse e-mail valide de l'université (exemple : example@ucd.ac.ma)",
          position: "top",
          visibilityTime: 3000,
          autoHide: true,
        });

        return;
      }

      console.log(email, password);
      // Create user account
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log(user);

      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          email: user.email,
          id: user.uid,
          roles: ["user"],
        });

      Toast.show({
        type: "success",
        text1: "Compte créé avec succès 👋",
        text2: "Votre compte a été créé avec succès",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      console.log("User registered successfully!");
      navigation.navigate("Login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erreur de création de compte",
        text2: "Email ou mot de passe incorrecte",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });

      console.error("Error signing up:", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bg3.jpeg")}
      style={styles.backgroundImage}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../../assets/images/fac.png")}
            style={styles.img}
          />
        </View>
        <Text style={styles.title1}>Créez votre compte dès maintenant !</Text>
        <Input
          value={email}
          inputStyle={{
            paddingVertical: 10,
            backgroundColor: "#fff",
            paddingHorizontal: 10,
            marginTop: 5,
          }}
          onChangeText={(text) => setEmail(text.trim())}
          label="Email"
          placeholder="Entrer votre email"
        />

        <Input
          secureTextEntry={true}
          value={password}
          inputStyle={{
            paddingVertical: 10,
            backgroundColor: "#fff",
            paddingHorizontal: 10,
            marginTop: 5,
          }}
          onChangeText={(text) => setPassword(text.trim())}
          label="Password"
          placeholder="Entrer votre mot de passe"
        />
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          buttonStyle={{
            marginVertical: 10,
            marginHorizontal: 10,
            borderRadius: 10,
          }}
          titleStyle={{ fontSize: 17, color: "white", fontWeight: "bold" }}
          color="primary"
          size="lg"
        />
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingVertical: 15,
            marginHorizontal: 10,
          }}
        >
          <Text>Vous avez déjà un compte ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.text}>Connectez-vous ici</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = SingupStyles;

export default Signup;
