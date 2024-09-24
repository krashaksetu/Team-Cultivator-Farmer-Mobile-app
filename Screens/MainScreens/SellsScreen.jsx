// Screens/SellsScreen/SellsScreen.jsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

// Dummy sells data
const sellsData = [
  {
    product_id: "PROD123",
    product_name: "Tomatoes",
    quantity_sold: "50 kg",
    price_per_unit: "₹20",
    total_revenue: "₹1000",
    date_sold: "2024-09-20"
  },
  {
    product_id: "PROD124",
    product_name: "Onions",
    quantity_sold: "100 kg",
    price_per_unit: "₹15",
    total_revenue: "₹1500",
    date_sold: "2024-09-18"
  },
  {
    product_id: "PROD125",
    product_name: "Carrots",
    quantity_sold: "80 kg",
    price_per_unit: "₹30",
    total_revenue: "₹2400",
    date_sold: "2024-09-15"
  }
];

// Component to display each sell item
const SellItem = ({ item }) => {
  return (
    <Animatable.View animation="slideInRight" duration={1000} style={styles.sellItem}>
      <Text style={styles.title}>Product: {item.product_name}</Text>
      <Text>Quantity Sold: {item.quantity_sold}</Text>
      <Text>Price per Unit: {item.price_per_unit}</Text>
      <Text>Total Revenue: {item.total_revenue}</Text>
      <Text>Date Sold: {item.date_sold}</Text>
    </Animatable.View>
  );
};


// Sells Screen component
const SellsScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground 
            source={require('../../assets/images/splashbackground.png')}
            style={styles.imageBasckground}
            >
      {/* <Text style={styles.header}>Sells Summary</Text> */}
      <FlatList
        data={sellsData}
        renderItem={({ item }) => <SellItem item={item} />}
        keyExtractor={(item) => item.product_id}
        showsVerticalScrollIndicator={false}
      />
      </ImageBackground>
    </View>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // backgroundColor: '#f5f5f5',
  },
  imageBasckground: {
    flex: 1,
      resizeMode: 'cover',  // Ensures the image covers the entire background
      justifyContent: 'center',
      //alignItems: 'center',
      padding: 20
  },
  // header: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
  sellItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#C49350',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default SellsScreen;