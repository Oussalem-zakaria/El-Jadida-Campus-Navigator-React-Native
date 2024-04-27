import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { CheckBox, Icon } from "@rneui/themed";
import { Button } from "./index";
import { useState } from "react";

export default function EventCheckBox({ navigation, data }) {
  const [checked, setState] = useState(false);
  const toggleCheckbox = () => setState(!checked);
  return (
      <CheckBox
        checked={checked}
        checkedIcon="heart"
        uncheckedIcon="heart-o"
        checkedColor="red"
        onPress={toggleCheckbox}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
});
