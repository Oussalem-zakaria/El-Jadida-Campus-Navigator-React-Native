import { Button, SectionList, StyleSheet, Text, View } from "react-native";
import { events } from "../../Data/events";
import { Events, Search } from "../components/index";
import { useState } from "react";
import { eventStyles } from "../../styles/pages/eventStyles";

export default function EventsScreen({ navigation }) {
  console.log(events);
  const [yourEvents, setEvents] = useState(events);

  const handleSearch = (searchTerm) => {
    const filteredData = events.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEvents(filteredData);
  };

  return (
    <View style={styles.container}>
      <Search data={events} onSearch={handleSearch} />
      {yourEvents.length === 0 && (
        <Text style={{ textAlign: "center" }}>No events found</Text>
      )}
      {yourEvents.length > 0 && (
        <Events navigation={navigation} data={yourEvents} />
      )}
    </View>
  );
}

const styles = eventStyles;
