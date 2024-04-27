import Toast from "react-native-toast-message";
import { firebase } from "../../../../Data/firebase/config";
import { useAuth } from "../../../context/AuthContext";

// export const handleSignIn = async (email,password,navigation,login,checkUserRole) => {
//     try {
//       await firebase.auth().signInWithEmailAndPassword(email, password);

//       Toast.show({
//         type: "success",
//         text1: "Réussite",
//         text2: "Vous êtes connecté avec succès",
//         position: "top",
//         visibilityTime: 3000,
//         autoHide: true,
//       });

//       console.log("User signed in successfully!");
//       login(); // Call the login function to update isLoggedIn in the context
//     //   checkUserRole();
//       navigation.navigate("Home");
//     } catch (error) {
//       Toast.show({
//         type: "error",
//         text1: "Erreur de connexion",
//         text2: "Email ou mot de passe incorrecte",
//         position: "top",
//         visibilityTime: 3000,
//         autoHide: true,
//       });

//       console.error("Error signing in:", error.message);
//     }
//   };

export const handleSignIn = async (email, password, navigation, login, checkUserRole) => {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user; // Get the user object from the userCredential
        
        Toast.show({
            type: "success",
            text1: "Réussite",
            text2: "Vous êtes connecté avec succès",
            position: "top",
            visibilityTime: 3000,
            autoHide: true,
        });

        console.log("User signed in successfully!");
        await login(user); // Pass the user object to the login function
        navigation.navigate("Home");
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "Erreur de connexion",
            text2: "Email ou mot de passe incorrecte",
            position: "top",
            visibilityTime: 3000,
            autoHide: true,
        });

        console.error("Error signing in:", error.message);
    }
};
