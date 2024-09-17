import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const SignUpScreen = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [otp, setOtp] = useState('');
 //const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Implement sign-up logic here
    if (cardNumber == '123456789' && otp == '123456') {
      navigation.navigate('HomeStack')
    }
    else {
      Alert.alert('SignUp', 'Details are invalid');
    }
    
  };

  const requestNewOtp = () => {
    // Implement OTP request logic here
    Alert.alert('Request OTP', 'New OTP requested.');
  };

  return (
    <View style={styles.container}>
        <View  style={styles.cardContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logoImage}/>

<Text style={styles.welcomeText}>
  "From farm to market, we’re here to help you thrive. Sign up and start selling today."
</Text>

<TextInput
  style={styles.input}
  placeholder="Kiosk Card Number"
  keyboardType="phone-pad"
  value={cardNumber}
  onChangeText={setCardNumber}
/>

<TextInput
  style={styles.input}
  placeholder="OTP"
  keyboardType="numeric"
  value={otp}
  onChangeText={setOtp}
/>

<TextInput
 // style={styles.input}
 // secureTextEntry={true} // This makes the password field masked
  //value={password}
  //onChangeText={setPassword}
/>

<TouchableOpacity style={styles.requestOtpButton} onPress={requestNewOtp}>
  <Text style={styles.buttonText}>Request new OTP</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
  <Text style={styles.buttonText}>Sign-Up</Text>
</TouchableOpacity>

<Text style={styles.orText}>or</Text>

<TouchableOpacity onPress={() => navigation.navigate('Login')}>
  <Text style={styles.orText}>If already Registered then <Text style={styles.signUpText}>Log-in</Text></Text>
</TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    width: '90%',            // Card width to give space around it
    //height: '100%',
    padding: 20,             // Padding inside the card
    backgroundColor: '#D0F4DE', // White background for the card
    borderRadius: 10,        // Rounded corners for the card
    elevation: 5,            // Android elevation (shadow)
    maxHeight: '80%',           // Limit the height to 80% of the screen
    justifyContent: 'center',   // Center the content within the card
  },
  logoImage: {
    width: 200,
    height: 100,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderColor: '#5a9a1b',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  requestOtpButton: {
    backgroundColor: '#5a9a1b',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  signUpButton: {
    backgroundColor: '#5a9a1b',
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

export default SignUpScreen;
