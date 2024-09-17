import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import { baseGestureHandlerWithMonitorProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
//import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
    const [image, setImage] = useState(null);

    const handleImagePick = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    const handleLogout = () => {
        navigation.navigate('Login');  // Replace 'Login' with the name of your login screen in the navigator
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleImagePick}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text>+ Add Image</Text>
              </View>
            )}
            </TouchableOpacity>
            <View style={styles.destailsContainer}>
            <Text style={styles.sectionTitle}>Personal Info</Text>
            <Text>Name: John Doe</Text>
            <Text>Age: 30</Text>
            <Text>Mobile No: 1234567890</Text>
            <Text>Address: 123 Main St, City</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Farm Details</Text>
            <Text>Farm Area: 500 sq ft</Text>
            <Text>Crops Type: Wheat</Text>
            <Text>Year of Ownership: 2020</Text>
            <Text>Production Rate: 85.5</Text>
            <Text>Quality Rating: 4.2</Text>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.buttonBackground} onPress={handleLogout}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#D0F4DE',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ddd',
        marginBottom: 20,
        alignSelf: 'center',
    },
    imagePlaceholder: {
      width: 120,
      height: 120,
      backgroundColor: '#e0e0e0',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 20,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
    },
    divider: {
        height: 1,
        backgroundColor: '#000',
        marginVertical: 20,
    },

    destailsContainer: {
      flex: 1,
      padding: 20,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      backgroundColor: '#fff'
    },
  buttonBackground: {
    backgroundColor: '#5a9a1b',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;