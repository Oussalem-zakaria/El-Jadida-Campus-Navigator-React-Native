import { firebase } from "../../../../Data/firebase/config";

export const fetchData = async (collection, setState) => {
  try {
    const locationsRef = firebase
      .firestore()
      .collection(collection)
      .orderBy("name");
    locationsRef.onSnapshot((snapshot) => {
      const locationsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setState(locationsData);
      console.log("Locations updated successfully:", locationsData);
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
};
