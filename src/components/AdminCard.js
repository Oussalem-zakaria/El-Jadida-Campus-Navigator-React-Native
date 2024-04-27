import { Icon } from "@rneui/themed";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { adminStyles } from "../../styles/pages/adminStyles";

const AdminCard = ({ iconName, title, onPress }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Icon name={iconName} size={35} style={{ marginRight: 10 }} color="black" />
        <Text style={styles.cardText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const styles = adminStyles;
export default AdminCard;