import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Button } from "./index";
import { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { searchStyles } from "../../styles/pages/searchStyles";

export default function Search({ navigation, data,onSearch }) {
  const [search, setSearch] = useState("");
  
  return (
    <View style={styles.containerSearch}>
      <SearchBar
        ref={(search) => (this.search = search)}
        placeholder="Search"
        value={search}
        inputContainerStyle="light"
        onChangeText={setSearch}
        onSubmitEditing={() => {
        //   this.search.clear();
        //   this.search.blur();
            onSearch(search)
        }}
        platform="android"
      />
    </View>
  );
}

const styles = searchStyles;
