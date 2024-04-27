import {
  HomeScreen,
  EventsScreen,
  LocationScreen,
  Signup,
  ResetPasswordScreen,
} from "../screens/index";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import Login from "../screens/Login";
import { Icon } from "@rneui/themed";
import AdminPage from "../screens/AdminPage";
import AddLocationPage from "../screens/AddLocationPage";
import AddUser from "../screens/AddUser";

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const { isLoggedIn, logout, isAdmin } = useAuth();
  console.log("IsLoggedIn", isLoggedIn);
  console.log("IsAdmin", isAdmin);
  // if(isLoggedIn){
  return (
    <Drawer.Navigator
      initialRouteName={isLoggedIn ? "Home" : "Login"}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#0088cc", height: 100 },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerLeft: () => {
          return (
            <Ionicons
              name="menu"
              size={40}
              color="white"
              style={{ marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          );
        },
        headerRight: () => {
          return isLoggedIn ? (
            <TouchableOpacity onPress={logout}>
              {/* <Image
                  source={require("../../assets/images/locationIcon.png")}
                  style={styles.image}
                /> */}
              <Icon
                name="logout"
                size={35}
                style={{ marginRight: 10 }}
                color="white"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Image
                source={require("../../assets/images/logofsa2.webp")}
                style={styles.img}
              />
            </TouchableOpacity>
          );
        },
      })}
    >
      {!isLoggedIn && (
        <Drawer.Screen
          name="Singup"
          component={Signup}
          options={{ animation: "slide_from_right", headerTitle: "" }}
        />
      )}
      {!isLoggedIn && (
        <Drawer.Screen
          name="Login"
          component={Login}
          options={{ animation: "slide_from_right", headerTitle: "" }}
        />
      )}
      {!isLoggedIn && (
        <Drawer.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{ animation: "slide_from_right", headerTitle: "" }}
        />
      )}
      {isAdmin && (
        <Drawer.Screen
          name="Admin"
          component={AdminPage}
          options={{ animation: "slide_from_right", headerTitle: "" }}
        />
      )}
      {isAdmin && (
        <Drawer.Screen
          name="AddLocation"
          component={AddLocationPage}
          options={{ animation: "slide_from_right", headerTitle: "" }}
        />
      )}
      {isLoggedIn && (
        <>
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{ animation: "slide_from_right", headerTitle: "" }}
          />
          <Drawer.Screen
            name="Events"
            component={EventsScreen}
            options={{ animation: "slide_from_right", headerTitle: "" }}
          />
          <Drawer.Screen
            name="Location"
            component={LocationScreen}
            options={{ animation: "slide_from_right", headerTitle: "" }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

// };

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  img: {
    width: 90,
    height: 50,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default AppNavigator;
