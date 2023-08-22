import { StyleSheet } from "react-native";
//import the screens we want to navigate
import Start from "./components/Start";
import Chat from "./components/Chat";
//import React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage } from "firebase/storage";

const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAw6p0J8sb2SxQNuc_xumHEncIwD4rUYOI",
    authDomain: "chat-app-fb591.firebaseapp.com",
    projectId: "chat-app-fb591",
    storageBucket: "chat-app-fb591.appspot.com",
    messagingSenderId: "57868372876",
    appId: "1:57868372876:web:efcf57f92e3e5c4b46a4a9",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  //Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const storage = getStorage(app);

  const connectionStatus = useNetInfo();

  //create the navigator
  const Stack = createNativeStackNavigator();

  //displays an alert popup when connection is lost
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  return (
    <NavigationContainer>
      {/* Navigation between Screens */}
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
