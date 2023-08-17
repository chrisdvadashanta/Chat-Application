import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, Timestamp, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor, userID } = route.params;
  
  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        const data = doc.data();
        const createdAt = data.createdAt?.toDate(); // Convert Firestore Timestamp to JavaScript Date
        newMessages.push({
          _id: doc.id,
          text: data.text,
          createdAt: createdAt,
          user: {
            _id: data.user._id,
            name: data.user.name,
          },
        });
      });
      setMessages(newMessages);
    });
    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);
 
  const containerStyle = {
    ...styles.container,
    backgroundColor: backgroundColor,
  };
//// Updating the send Message
const onSend = (newMessages) => {
  const messageToSave = {
      ...newMessages[0],
      createdAt: Timestamp.fromDate(newMessages[0].createdAt)
  };

  addDoc(collection(db, "messages"), messageToSave);
}
 
  const renderBubble = (props) => {
    console.log("Rendering bubble...");
    return ( <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "black"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
    );
  };

  return (
    <View style={containerStyle}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : null} 
        style={{ flex: 1 }} // This ensures it takes up all available space
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -300} // Adjust this value as needed
      >
      <GiftedChat
      style= {styles.GiftedChat}
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: userID,
        name: name
      }}
    />
    </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
