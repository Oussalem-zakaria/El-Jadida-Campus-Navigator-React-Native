import React, { useState } from "react";
import { Image, ImageBackground, View } from "react-native";
import { Button, Icon, Input } from "@rneui/themed";
import { resetPassword } from "../services/firebase/AuthManager"; // Importez la fonction de réinitialisation du mot de passe depuis votre gestionnaire d'authentification
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { resetPasswordStyle } from "../../styles/auth/resetPasswordStyle";

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Veuillez saisir votre adresse e-mail.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }

    try {
      console.log(email);
      await resetPassword(email);
      Toast.show({
        type: "success",
        text1: "Succès",
        text2:
          "Un e-mail de réinitialisation du mot de passe a été envoyé à votre adresse e-mail.",
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
      navigation.navigate("Login");
    } catch (error) {
      //   Alert.alert("Erreur", error.message);
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: error.message,
        position: "top",
        visibilityTime: 3000,
        autoHide: true,
      });
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
        <View style={{ flex: 1, justifyContent: "center" }}>
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
          <Text style={styles.title1}>
            Entrez votre adresse e-mail pour réinitialiser votre mot de passe
          </Text>
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
            placeholder="Adresse e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Button
            title="Réinitialiser le mot de passe"
            onPress={handleResetPassword}
            buttonStyle={{
              marginVertical: 10,
              marginHorizontal: 10,
              borderRadius: 10,
            }}
            titleStyle={{ fontSize: 17, color: "white", fontWeight: "bold" }}
            color="primary"
            size="lg"
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = resetPasswordStyle;

export default ResetPasswordScreen;
