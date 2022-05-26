import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import {
  useFonts,
  Sarabun_700Bold,
  Sarabun_400Regular,
  Sarabun_300Light,
} from "@expo-google-fonts/sarabun";

const contactForm = () => {
  let [fontsLoaded] = useFonts({
    Sarabun_700Bold,
    Sarabun_400Regular,
    Sarabun_300Light,
  });
  
  
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendContactForm = () => {
    let mailto = `mailto:beshehiwot@gmail.com`;
    mailto += `&subject=${subject}`;
    mailto += `&body=${message}`;
    Linking.openURL(mailto);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>

      {/* Subject Text Input */}
      <View>
      <Text style={styles.inputHeaders}>Subject</Text>
      <TextInput
        style={styles.textInputs}
        onChangeText={(e) => setSubject(e)}
        value={subject}
      />

      {/* Message text input */}
      <Text style={styles.inputHeaders}>Enter Message</Text>
      <TextInput
        style={styles.messageInput}
        onChangeText={(e) => setMessage(e)}
        value={message}
        numberOfLines={10}
        multiline={true}
      />
      </View>

      <Pressable 
        onPress={sendContactForm}
        style={styles.submitButton}
        >
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        marginTop: 120
    },
    header:{
        fontSize: 28,
        marginBottom: 25,
        fontFamily: "Sarabun_700Bold"
    },
    inputHeaders:{
        alignSelf: 'flex-start',
        fontSize: 16,
        color: '#828282',
        fontFamily: "Sarabun_700Bold",
    },
    textInputs:{
        width: 350,
        height: 62,
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        marginTop: 8,
        marginBottom: 20,
        fontFamily: "Sarabun_300Light"
    },
    submitButton:{
        marginTop: 31,
        width: 118,
        height: 56,
        backgroundColor: 'black',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageInput:{
        width: 350,
        height: 190,
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        fontFamily: "Sarabun_300Light"
    },
    buttonText:{
        color: 'white',
        fontSize: 24,
        fontFamily: "Sarabun_700Bold"
    },
});

export default contactForm;
