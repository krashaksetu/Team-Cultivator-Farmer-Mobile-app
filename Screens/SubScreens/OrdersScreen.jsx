import { View, Text, StyleSheet, FlatList, ImageBackground } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

// Dummy order history data
const orderHistoryData = [
  {
    order_id: "ORD12345",
    product_name: "Tomatoes",
    quantity: "50 kg",
    price_per_unit: "₹20",
    total_price: "₹1000",
    order_date: "2024-09-15",
    delivery_date: "2024-09-20",
    buyer: {
      name: "Fresh Market",
      address: "Jaipur, Rajasthan"
    },
    order_status: "Delivered"
  },
  {
    order_id: "ORD12346",
    product_name: "Onions",
    quantity: "100 kg",
    price_per_unit: "₹15",
    total_price: "₹1500",
    order_date: "2024-09-12",
    delivery_date: "2024-09-18",
    buyer: {
      name: "Grocery Mart",
      address: "Delhi, India"
    },
    order_status: "Delivered"
  },
  {
    order_id: "ORD12348",
    product_name: "Carrots",
    quantity: "80 kg",
    price_per_unit: "₹30",
    total_price: "₹2400",
    order_date: "2024-09-05",
    delivery_date: "2024-09-12",
    buyer: {
      name: "Organic Farms",
      address: "Mumbai, Maharashtra"
    },
    order_status: "In Transit"
  }
];

// Component to display each order item
const OrderItem = ({ item }) => {
  return (
    <Animatable.View animation="slideInRight" duration={1000} style={styles.orderItem}>
      <Text style={styles.title}>Order ID: {item.order_id}</Text>
      <Text>Product: {item.product_name}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Total Price: {item.total_price}</Text>
      <Text>Order Date: {item.order_date}</Text>
      <Text>Delivery Date: {item.delivery_date}</Text>
      <Text>Status: <Text style={styles.status(item.order_status)}>{item.order_status}</Text></Text>
      <Text>Buyer: {item.buyer.name} - {item.buyer.address}</Text>
    </Animatable.View>
  );
};

const OrdersScreen = () => {
  return (
    <View style={styles.container}>
       <ImageBackground 
            source={require('../../assets/images/splashbackground.png')}
            style={styles.imageBasckground}
            >
      {/* <Text style={styles.header}>Order History</Text> */}
      <FlatList
        data={orderHistoryData}
        renderItem={({ item }) => <OrderItem item={item} />}
        keyExtractor={(item) => item.order_id}
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
   //backgroundColor: '#f5f5f5',
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
  // header: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
  orderItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#C49350',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: (status) => ({
    color: status === 'Delivered' ? 'green' : status === 'In Transit' ? 'orange' : 'red',
    fontWeight: 'bold',
  }),
});

export default OrdersScreen;