import { firebase } from "../../../Data/firebase/config";

export const resetPassword = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
  } catch (error) {
    // If the user does not exist or if there is any other error, throw an error
    throw new Error(
      "Failed to send password reset email. Please try again later."
    );
  }
};
