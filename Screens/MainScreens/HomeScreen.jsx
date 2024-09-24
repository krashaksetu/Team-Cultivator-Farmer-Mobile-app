import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ImageBackground, BackHandler, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AutoCarousel from './AutoCarousel';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import renderCard from '../Components/CardRender';

// Your updated data
const data = [
  { id: 1, title: 'Inventory', image: require('./../../assets/images/inventory.png') },
  { id: 2, title: 'Order History', image: require('./../../assets/images/orderHistory.png') },
  { id: 3, title: 'Payments', image: require('./../../assets/images/payments.png') },
  { id: 4, title: 'Schemes', image: require('./../../assets/images/schemes.png') }, // Updated
  { id: 5, title: 'Farmer Store', image: require('./../../assets/images/store.png') }, // Updated
  { id: 6, title: 'Complaint Desk', image: require('./../../assets/images/complaint.png') },
  { id: 7, title: 'AI Assistant', image: require('./../../assets/images/ai.png') },
  { id: 8, title: 'Mandi Connect', image: require('./../../assets/images/marketPlace.png') },
  { id: 9, title: 'Feedback', image: require('./../../assets/images/feedback.png') },

];

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

 

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
            source={require('../../assets/images/splashbackground.png')}
            style={styles.imageBasckground}
            >
      
      {/* Header with Logo and Menu */}
      <View style={styles.headerContainer}>
        {/* App Logo */}
        <Image source={require('./../../assets/images/logo.png')} style={styles.logo} />

        {/* Menu */}
        <TouchableOpacity style={styles.menuIcon} onPress={() => {}}>
          <Ionicons name="menu" size={35} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
      {/* Background Section with Scrolling Image */}
      <View style={styles.scrollImage}>
        <AutoCarousel/>
      </View>
      
      {/* Grid View for Cards */}
      
      <FlatList
          data={data}
          renderItem={({ item }) => renderCard({ item, navigation, styles })} // Use the imported function
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          scrollEnabled={false}
        />
        </ScrollView>
        </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#f9f9f9',
  },
  imageBasckground: {
    flex: 1,
      resizeMode: 'cover',  // Ensures the image covers the entire background
      justifyContent: 'center',
      //alignItems: 'center',
      //padding: 20
  },
  scrollImage: {
    width: '100%',
    height: 180,
  },
  
  gridContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    height: 80,
    alignItems: 'center',
    //marginTop: -35,
    backgroundColor: '#4CAF50',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  menuIcon: {
    paddingRight: 15,
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 2,
    borderColor: '#C49350',
    elevation: 20, // Adds shadow for iOS and Android
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
    tintColor: '#C49350'
  },
  cardTitle: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000'
  },
 
});

export default HomeScreen;
