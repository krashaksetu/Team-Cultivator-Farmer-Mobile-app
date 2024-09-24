import React, { useState } from 'react';
<<<<<<< HEAD
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ImageBackground } from 'react-native';
import {collection, query, doc, where, getDocs} from 'firebase/firestore';
import { db } from '../../config/FirbaseConfig';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
>>>>>>> ecff7ffbc70ca8db8144207a629ac9956f7ee923

const LoginScreen = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
<<<<<<< HEAD
  const [aadharNumber, setAadharNumber] = useState('');

  const handleLogin = async() => {
    if (mobileNumber == '8218553387' && otp == '654321' && aadharNumber != null) {
      try {
        // Query the 'farmers' collection where the 'aadharNumber' field matches the input
        const farmerQuery = query(collection(db, 'farmers'), where('aadharNumber', '==', aadharNumber));
        const querySnapshot = await getDocs(farmerQuery);

        if (!querySnapshot.empty) {
          // Farmer found, get the first document
          const farmerDoc = querySnapshot.docs[0];
          const farmerData = farmerDoc.data(); // Get farmer data

          // Store farmer data in AsyncStorage
          await AsyncStorage.setItem('farmerData', JSON.stringify(farmerData));

          // Navigate to Home page after login
          navigation.navigate('HomeStack');
        } else {
          Alert.alert('Error', 'Farmer not found');
        }
      } catch (error) {
        console.error("Error fetching farmer details:", error);
        Alert.alert('Error', 'Failed to fetch farmer details');
      }
=======

  const handleLogin = () => {
    if (mobileNumber == '8218553387' && otp == '654321') {
      navigation.navigate('HomeStack')
>>>>>>> ecff7ffbc70ca8db8144207a629ac9956f7ee923
    }
    else {
      Alert.alert('Login', 'Details are invalid');
    }
  };

  const requestNewOtp = () => {
    // Implement OTP request logic here
    Alert.alert('Request OTP', 'New OTP requested.');
  };

  return (
    <View style={styles.container}>
    <ImageBackground source={require('../../assets/splash.png')} style={styles.imageBasckground}>
    {/* Applying fadein animation to the card */}
    <Animatable.View animation="fadeIn" duration={4000} style={styles.cardContainer}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logoImage}/>

<Text style={styles.welcomeText}>Welcome</Text>
<Text style={styles.subText}>"From farm to market, we’re here to help you thrive. Login and start selling today."</Text>

<TextInput
  style={styles.input}
  placeholder="Aadhar Number"
  keyboardType="phone-pad"
  value={aadharNumber}
  onChangeText={setAadharNumber}
/>

<TextInput
  style={styles.input}
  placeholder="Mobile Number"
  keyboardType="phone-pad"
  value={mobileNumber}
  onChangeText={setMobileNumber}
/>

<TextInput
  style={styles.input}
  placeholder="OTP"
  keyboardType="numeric"
  value={otp}
  onChangeText={setOtp}
/>

<TouchableOpacity style={styles.Button} onPress={requestNewOtp}>
  <Text style={styles.buttonText}>Request new OTP</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.Button} onPress={handleLogin}>
  <Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>
</Animatable.View>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

imageBasckground: {
  flex: 1,
    resizeMode: 'cover',  // Ensures the image covers the entire background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
},
  cardContainer: {
    flex: 1,
    width: '90%',            // Card width to give space around it
    //height: '100%',
    padding: 20,             // Padding inside the card
    backgroundColor: '#B9FF6D', // White background for the card
    borderRadius: 10,        // Rounded corners for the card
    elevation: 10,            // Android elevation (shadow)
    maxHeight: '75%',           // Limit the height to 80% of the screen
    justifyContent: 'center',   // Center the content within the card
    borderWidth: 2,
    borderColor: '#fff'
  },
  logoImage: {
    width: 200,
    height: 100,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#C49350',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  Button: {
    backgroundColor: '#C49350',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  signUpText: {
    textAlign: 'center',
    color: '#5a9a1b',
    fontWeight: 'bold',
  },
});

export default LoginScreen;