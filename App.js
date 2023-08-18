import { StatusBar } from 'expo-status-bar';
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore , disableNetwork, enableNetwork } from "firebase/firestore";


import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();


export default function App() {

  ///firebase Code
  const firebaseConfig = {
    apiKey: "AIzaSyAw6p0J8sb2SxQNuc_xumHEncIwD4rUYOI",
    authDomain: "chat-app-fb591.firebaseapp.com",
    projectId: "chat-app-fb591",
    storageBucket: "chat-app-fb591.appspot.com",
    messagingSenderId: "57868372876",
    appId: "1:57868372876:web:efcf57f92e3e5c4b46a4a9"
    };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  /// Connection
  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false)
    { Alert.alert("Connection lost!");
    disableNetwork(db);
  } else if (connectionStatus.isConnected === true) {
    enableNetwork(db);
  }
}, [connectionStatus.isConnected]);

    
  return (
    // Naviagtion between different screens
    <NavigationContainer>       
      <Stack.Navigator
        initialRouteName="Screen1"
      >
    {/* start screen defined as initial */}
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          children={props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props}/>}
        />
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
