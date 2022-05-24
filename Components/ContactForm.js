import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";

const contactForm = () => {
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

      {/* Email Text Input */}
      <View>
      <Text style={styles.inputHeaders}>Email</Text>
      <TextInput
        style={styles.textInputs}
        onChangeText={(e) => setEmail(e)}
        value={email}
      />

      {/* Subject Text Input */}
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
        fontWeight: '700',
        fontSize: 28,
        marginBottom: 25
    },
    inputHeaders:{
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: '700',
        color: '#828282',
    },
    textInputs:{
        width: 350,
        height: 62,
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        marginTop: 8,
        marginBottom: 20
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
        borderRadius: 10
    },
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 24,
    },
});

export default contactForm;
