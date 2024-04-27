import { Dialog } from "@rneui/themed";
import React, { createContext, useContext, useState } from "react";
import { Text, Button, View } from "react-native";
import { firebase } from "../../Data/firebase/config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    isLoggedIn: false,
    isDialogVisible: false,
    isAdmin: false,
  });

  const login = async (user) => {
    try {
      setState({
        ...state,
        user: user,
        isLoggedIn: true,
        isDialogVisible: false, // Hide any open dialog
        isAdmin: await checkUserRole(user.uid),
      });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    // Mettre à jour l'état pour afficher la boîte de dialogue
    setState({
      ...state,
      isDialogVisible: true,
    });

    // Implémenter la déconnexion de l'utilisateur ici
    // Par exemple, réinitialiser le token d'authentification, vider le cache, etc.
    // Vous devrez remplacer cette ligne par votre propre logique de déconnexion
    console.log("User logged out successfully");
  };

  const handleConfirmLogout = () => {
    setState({
      ...state,
      user: null,
      isLoggedIn: false,
      isAdmin: false,
      isDialogVisible: false, // Hide the dialog after confirming logout
    });
  };

  const handleCancelLogout = () => {
    setState({
      ...state,
      isDialogVisible: false, // Hide the dialog if canceling logout
    });
  };

  const checkUserRole = async (uid) => {
    try {
      const userDoc = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get();
      const userData = userDoc.data();
      console.log("User Data:", userData);

      if (userData && userData.roles && userData.roles.includes("admin")) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      return false; // Return false in case of any error
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, checkUserRole }}>
      {children}
      <Dialog
        isVisible={state.isDialogVisible}
        onBackdropPress={handleCancelLogout}
      >
        <Dialog.Title title="Déconnexion" />
        <Text>Êtes-vous sûr de vouloir vous déconnecter ?</Text>
        <Dialog.Actions>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Dialog.Button
              title="Déconnexion"
              onPress={handleConfirmLogout}
              color={"red"}
            />
            <Dialog.Button
              title="Annuler"
              onPress={() => setState({ ...state, isDialogVisible: false })}
              color={"blue"}
            />
          </View>
        </Dialog.Actions>
      </Dialog>
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
