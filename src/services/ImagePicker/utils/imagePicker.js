import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { firebase } from "../../../../Data/firebase/config";

export const pickImage = async (setImage) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  const source = { uri: result.assets[0].uri };
  console.log("Source", source);
  setImage(source);
};

export const uploadImage = async (image,setUploading) => {
  setUploading(true);
  const response = await fetch(image.uri);
  const blob = response.blob();
  const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
  var ref = firebase.storage().ref().child(filename).put(blob);
  try {
    await ref;
  } catch (e) {
    console.log(e);
  }
  setUploading(false);
  // Alert.alert("Photo uploaded!");
  Toast.show({
    type: "success",
    text1: "Success",
    text2: "Photo uploaded!",
    position: "top",
    visibilityTime: 3000,
    autoHide: true,
  });
  // setImage(null);
};
