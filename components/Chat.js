import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor } = route.params;
  
  useEffect(() => {
    navigation.setOptions({ title: name });
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);
 
  const containerStyle = {
    ...styles.container,
    backgroundColor: backgroundColor,
  };

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
      user={{ _id: 1 }}
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
