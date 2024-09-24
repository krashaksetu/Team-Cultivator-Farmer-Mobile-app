import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, BackHandler, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import HomeScreen from './HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
//import { baseGestureHandlerWithMonitorProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
//import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({route, navigation}) => {
    const [image, setImage] = useState(null);
    const [farmerData, setFarmerData] = useState(null);

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

    useEffect(() => {
      const fetchFarmerData = async () => {
        try {
          const storedFarmerData = await AsyncStorage.getItem('farmerData');
          if (storedFarmerData) {
            setFarmerData(JSON.parse(storedFarmerData));  // Parse and set farmer data
          }
        } catch (error) {
          console.error('Error fetching farmer data', error);
        }
      };
  
      fetchFarmerData();  // Fetch data when component mounts
    }, []);
  
    if (!farmerData) {
      return <Text>Loading...</Text>;  // Show loading if data isn't ready yet
    }

    return (
        <View style={styles.container}>
          <ImageBackground 
            source={require('../../assets/images/splashbackground.png')}
            style={styles.imageBasckground}
            >
          <Animatable.View animation="zoomIn" duration={2000}>
          <TouchableOpacity onPress={handleImagePick}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text>+ Add Image</Text>
              </View>
            )}
            </TouchableOpacity>
            </Animatable.View>
            <Animatable.View animation="slideInUp" duration={2000} style={styles.destailsContainer}>
            
            <Text style={styles.sectionTitle}>Personal Info</Text>
            <Text>Name: {`${farmerData.name} ${farmerData.middleName} ${farmerData.surName}`}</Text>
            <Text>Age: 30</Text>
            <Text>Mobile No: {farmerData.contactNumber} </Text>
            <Text>Address: 123 Main St, City</Text>
            <Text>District: {farmerData.district}</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Farm Details</Text>
            <Text>Land Size: {farmerData.landSize} acres</Text>
            <Text>Land Type: {farmerData.landType}</Text>
            <Text>Soil Type: {farmerData.soilType}</Text>
            <Text>Land Address: {`${farmerData.landVillage}, ${farmerData.landDistrict}, ${farmerData.landTehsil}`}</Text>
            <Text>Landmark: {farmerData.landLandmark}</Text>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.buttonBackground} onPress={handleLogout}>
              <Text style={styles.buttonText}>Log Out</Text>
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
        //alignItems: 'center',
        paddingTop: 20,
        paddingEnd: 10,
        paddingStart: 10
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#C49350',
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
      borderWidth: 2,
      borderColor: '#C49350',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      backgroundColor: '#fff'
    },
  buttonBackground: {
    backgroundColor: '#C49350',
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