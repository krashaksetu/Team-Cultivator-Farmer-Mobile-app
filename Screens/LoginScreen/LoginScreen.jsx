import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const LoginScreen = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');

  const handleLogin = () => {
    if (mobileNumber == '8218553387' && otp == '654321') {
      navigation.navigate('HomeStack')
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
      <View style={styles.cardContainer}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logoImage}/>

<Text style={styles.welcomeText}>Welcome Back</Text>
<Text style={styles.subText}>Connecting Farmers to Opportunities</Text>

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

<TouchableOpacity style={styles.requestOtpButton} onPress={requestNewOtp}>
  <Text style={styles.buttonText}>Request new OTP</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
  <Text style={styles.buttonText}>Login</Text>
</TouchableOpacity>

<Text style={styles.orText}>or</Text>

<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
<Text style={styles.orText}>If not Registered already? then <Text style={styles.signUpText}>sign up</Text></Text>
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
    maxHeight: '75%',           // Limit the height to 80% of the screen
    justifyContent: 'center',   // Center the content within the card
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
    marginBottom: 20,
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
  loginButton: {
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

export default LoginScreen;