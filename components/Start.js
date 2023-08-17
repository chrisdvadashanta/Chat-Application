import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  LogBox
} from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

import Icon from "react-native-vector-icons/FontAwesome";

/// Logs to prevent messages in App
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const Start = ({ navigation }) => {
  
  ///// States 
  const [name, setName] = useState("");
  const [bgColor, setBgColor] = useState("");

  //   USer Authentication
  const auth = getAuth();

  const signInUser = () => {
    if(!name.trim()) {
        Alert.alert("Please enter a username before proceeding.");
        return;
    }

    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", {userID: result.user.uid , name: name , backgroundColor: bgColor });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
}


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../img/background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.title}> Chat App</Text>
        {/* Input field */}
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#000" style={styles.icon} />
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Type your username here"
          />
       { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
        </View>
        {/* bgColor buttons */}
        <View style={styles.containerBgColor}>
        <TouchableOpacity style={styles.buttonGreen} onPress={() => setBgColor('green')} />
        <TouchableOpacity style={styles.buttonOrange} onPress={() => setBgColor('orange')} />
        <TouchableOpacity style={styles.buttonBlue} onPress={() => setBgColor('blue')} />
        <TouchableOpacity style={styles.buttonBrown} onPress={() => setBgColor('brown')} />
        </View>
        <TouchableOpacity style={styles.buttonChat} onPress={ signInUser }>
          <Text> Go to Chat </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 70,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 20,
    position: "relative",
    backgroundColor: "white"
  },
  icon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    paddingLeft: 40,
    height: 40,
    width: "88%",
    
  },
  buttonChat: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,  // Fixed the borderRadius value
    backgroundColor: "#ffd966",
    width: 230,
    height: 40,
  },
  containerBgColor: {
    flexDirection: 'row',  // Add this line
    justifyContent: 'space-around',  // This ensures even spacing between the buttons
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,  // Optional: This might give some space below the color buttons
  },
  buttonGreen: {
    backgroundColor: 'green',
    width: 50,
    height: 50,
    borderRadius: 25, // Half the width and height to make it a circle
    marginHorizontal: 5  // Add some margin for spacing
  },
  // hoveredButtonGreen:{
  //   backgroundColor: 'green',
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25, // Half the width and height to make it a circle
  //   marginHorizontal: 5  // Add some margin for spacing
  // },
  buttonOrange: {
    backgroundColor: 'orange',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5 
  },
  buttonBlue: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5 
  },
  buttonBrown: {
    backgroundColor: 'brown',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5 
  },
  
});


export default Start;
