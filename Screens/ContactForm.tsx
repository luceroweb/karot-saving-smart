import React, { useState, FC } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Linking,
  Keyboard,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack'; 
import { RootStackParamList } from "../Utils/types";

type Props = NativeStackScreenProps<RootStackParamList, "ContactForm">


const ContactForm:FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
 
  
  const sendContactForm = () => {
    let mailto = `mailto:jlucero@alphaworks.tech`;
    mailto += `?subject=${subject}`;
    mailto += `&body=${message}`;
    Linking.openURL(mailto);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
      <AntDesign 
        name="left" 
        size={24} 
        color="#FFFFFF"
        onPress={()=> navigation.navigate("Overview")}
      />
      </View>
      
      
      <Text style={styles.header}>Contact Us</Text>

      {/* Subject Text Input */}
      <View>
    <Text style={styles.inputHeaders}>Email</Text>
      <TextInput
        style={[styles.inputs,styles.email]}
        onChangeText={(email) => setEmail(email)}
        value={email}
      />

      {/* Dropdown Menu */}
      <Text style={[styles.inputHeaders]}>Subject</Text>
      <Picker
        style={styles.picker}
        selectedValue={subject}
        onValueChange={
          (value, index) =>
          setSubject(value)
        }
      >
        <Picker.Item 
          label="placeholder 1" 
          value="placeholder 1"
          />
        <Picker.Item 
          label="placeholder 2" 
          value="jplaceholder 2"
          />
      </Picker>

      {/* Message text input */}
      <Text style={styles.inputHeaders}>Enter Message</Text>
      <TextInput
        style={[styles.inputs,styles.messageInput]}
        onChangeText={(e) => setMessage(e)}
        value={message}
        numberOfLines={10}
        multiline={true}
        keyboardType="default"
        returnKeyType="done"
        onSubmitEditing={()=>{Keyboard.dismiss()}}
      />
      </View>

      <Pressable 
        onPress={sendContactForm}
        style={styles.submitButton}
        >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      alignItems: "center",
      backgroundColor: "#215290",
      height: "100%",
      width: "100%",
    },
    backArrow: {
      position: "absolute",
      top: 20,
      left: 20,
    },
    header:{
      fontSize: 30,
      marginTop: 40,
      marginBottom: 25,
      color: "#FFFFFF",
      fontFamily: "Sarabun_700Bold"
    },
    inputHeaders:{
      alignSelf: 'flex-start',
      fontSize: 17,
      color: "#FFFFFF",
      fontFamily: "Sarabun_700Bold",
      marginLeft: 30,
      marginRight: 30,
      marginTop: 8,
      marginBottom: 5,
    },
    inputs: {
      width: 350,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      marginLeft: 30,
      marginRight: 30,
      marginTop: 6,
      marginBottom: 20,
    },
    email:{
      height: 62,
      backgroundColor: '#FFFFFF',
      padding: 10,
      fontFamily: "Sarabun_600SemiBold",
      fontSize: 15,
    },
    picker: {
      height: 62,
      width: 350,
      marginTop: 6,
      marginLeft: 30,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      justifyContent: "center",
    },
    messageInput:{
      height: 190,
      backgroundColor: '#FFFFFF',
      fontFamily: "Sarabun_600SemiBold",
      fontSize: 15,
      padding: 10,
    },
    submitButton:{
      marginTop: 30,
      marginLeft: 30,
      marginRight: 30,
      width: 118,
      height: 56,
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',    
  },
    buttonText:{
      color: '#000000',
      fontSize: 24,
      fontFamily: "Sarabun_700Bold",
    },
});

export default ContactForm;
