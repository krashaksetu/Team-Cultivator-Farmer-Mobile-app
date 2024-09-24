import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react'

var falge = false
const selectLanguage = () => {
  falge = true
}

const continueAvailable = () => {
  if (falge) {
    Alert.alert('Continue')
  } else {
    Alert.alert('can not continue')
  }
}
export default function LanguageSelection() {
  return (
    <View style={styles.container}>
        <View style={styles.cardContainer}>
            <TouchableOpacity style={styles.button} onPress={selectLanguage}>
            <Text style={styles.textStyele}>English</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={selectLanguage}>
            <Text style={styles.textStyele}>Hindi</Text>
            </TouchableOpacity>

             <TouchableOpacity style={styles.buttonColor} onPress={continueAvailable}>
            <Text style={styles.textStyele}>Continue</Text>
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
        //flex: 1,
        backgroundColor: '#D0F4DE',
        justifyContent: 'center',
        width: '90%',
        height: '50%',
        padding: 15,
        borderRadius: 10,
        elevation: 10,
        borderWidth: 2,
        borderColor: '#4caf50',
    },

    button: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        elevation: 10,
        margin: 10,
        borderColor: '#4caf50',
        borderWidth: 2,
    },

    buttonColor: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#00BCD4',
        elevation: 10,
        margin: 10,
        borderColor: '#4caf50',
        borderWidth: 2,
    },

    textStyele: {
        fontSize: 14,
        textAlign: 'center',
        color: '#000',
    }
})