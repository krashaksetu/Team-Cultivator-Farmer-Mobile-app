import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ImageBackground, BackHandler, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AutoCarousel from './AutoCarousel';
import { ScrollView } from 'react-native-gesture-handler';
import renderCard from '../Components/CardRender';

// Your updated data
const data = [
  { id: 1, title: 'Inventory', image: require('./../../assets/images/inventory.png') },
  { id: 2, title: 'Orders', image: require('./../../assets/images/orders.png') },
  { id: 3, title: 'Payments', image: require('./../../assets/images/payments.png') },
  { id: 4, title: 'Schemes', image: require('./../../assets/images/manage.png') }, // Updated
  { id: 5, title: 'Weather Forecast', image: require('./../../assets/images/products.png') }, // Updated
  { id: 6, title: 'Farm Analysis', image: require('./../../assets/images/history.png') }, // New
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
      
      {/* Header with Logo and Menu */}
      <View style={styles.headerContainer}>
        {/* App Logo */}
        <Image source={require('./../../assets/images/logo.png')} style={styles.logo} />

        {/* Menu */}
        <TouchableOpacity style={styles.menuIcon} onPress={() => {}}>
          <Ionicons name="menu" size={35} color="black" />
        </TouchableOpacity>
      </View>

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
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollImage: {
    width: '100%',
    height: 150,
  },
  
  gridContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    height: 80,
    alignItems: 'center',
    //marginTop: -35,
    backgroundColor: '#58C472',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  menuIcon: {
    paddingRight: 15,
  },

  card: {
    flex: 1,
    backgroundColor: '#D0F4DE',
    margin: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    elevation: 3, // Adds shadow for iOS and Android
  },
  cardImage: {
    width: 140,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
 
});

export default HomeScreen;
