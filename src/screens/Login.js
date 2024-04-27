import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { firebase } from "../../Data/firebase/config";
import { TextInput } from "react-native-gesture-handler";
import { Button, Icon, Input } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";

import Toast from "react-native-toast-message";
import { LoginStyles } from "../../styles/auth/LoginStyles";
import { handleSignIn } from "../services/firebase/utils/handleSignIn";

const styles = LoginStyles;

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login,checkUserRole } = useAuth();

  useEffect(() => {
    Toast.show({
      type: "info",
      text1: "Bienvenue 👋",
      text2: "Connectez-vous à votre compte",
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/bg2.jpg")}
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
        <Text style={styles.title1}>Connectez-vous à votre compte</Text>
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
          secureTextEntry={!passwordVisible}
          value={password}
          inputStyle={{
            paddingVertical: 10,
            backgroundColor: "#fff",
            paddingHorizontal: 10,
            marginTop: 5,
            flex: 1,
          }}
          onChangeText={(text) => setPassword(text.trim())}
          label="Password"
          placeholder="Entrer votre mot de passe"
          accessoryRight={() => (
            <Icon
              name={passwordVisible ? "home" : "home"}
              onPress={() => setPasswordVisible(!passwordVisible)}
              color={"black"}
            />
          )}
        />

        <Button
          title="Sign In"
          onPress={() => handleSignIn(email,password,navigation,login,checkUserRole)}
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
          <Text>Vous n'avez pas de compte ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Singup")}>
            <Text style={styles.text}>s'inscrire</Text>
          </TouchableOpacity>
        </View>

        <View style={{display:"flex",justifyContent:"center",flexDirection:"row",paddingVertical:10}}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <Text style={styles.text}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;
