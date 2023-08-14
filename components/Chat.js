import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
    const { name, backgroundColor } = route.params;
    const containerStyle = { ...styles.container, backgroundColor: backgroundColor };

    useEffect(() => {
        navigation.setOptions({ title: name });
      }, []);

 return (
   <View style={containerStyle}>
      <View style={styles.textContainer}>
          <Text>Hello Chat!</Text>
      </View>     
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',   //align the child centered
  },
  textContainer: {
    paddingHorizontal: 10,   // Add some horizontal padding
    paddingVertical: 5, 
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#ffd966',
    width: '50%',
    height: 40,
    justifyContent: 'center',  // Centers text vertically inside the view.
    alignItems: 'center',      // Centers text horizontally inside the view.
  }
});

export default Chat;