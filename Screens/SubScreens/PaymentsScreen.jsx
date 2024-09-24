import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

// Dummy payment data
const paymentsData = [
  {
    payment_id: "PAY12345",
    order_id: "ORD12345",
    transaction_date: "2024-09-21",
    amount: "₹1000",
    payment_method: "Bank Transfer",
    payment_status: "Completed"
  },
  {
    payment_id: "PAY12346",
    order_id: "ORD12346",
    transaction_date: "2024-09-19",
    amount: "₹1500",
    payment_method: "UPI",
    payment_status: "Completed"
  },
  {
    payment_id: "PAY12347",
    order_id: "ORD12347",
    transaction_date: "2024-09-18",
    amount: "₹2000",
    payment_method: "Credit Card",
    payment_status: "Completed"
  },
  {
    payment_id: "PAY12348",
    order_id: "ORD12348",
    transaction_date: "2024-09-14",
    amount: "₹2400",
    payment_method: "Net Banking",
    payment_status: "Pending"
  },
  {
    payment_id: "PAY12349",
    order_id: "ORD12349",
    transaction_date: "2024-09-10",
    amount: "₹1440",
    payment_method: "Cash on Delivery",
    payment_status: "Cancelled"
  }
];

// Component to display each payment item
const PaymentItem = ({ item }) => {
  return (
    <Animatable.View animation="slideInRight" duration={1000} style={styles.paymentItem}>
      <Text style={styles.title}>Payment ID: {item.payment_id}</Text>
      <Text>Order ID: {item.order_id}</Text>
      <Text>Transaction Date: {item.transaction_date}</Text>
      <Text>Amount: {item.amount}</Text>
      <Text>Payment Method: {item.payment_method}</Text>
      <Text>Status: <Text style={styles.status(item.payment_status)}>{item.payment_status}</Text></Text>
    </Animatable.View>
  );
};

// Payments Screen component
const PaymentsScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground 
            source={require('../../assets/images/splashbackground.png')}
            style={styles.imageBasckground}
            >
      {/* <Text style={styles.header}>Payment History</Text> */}
      <FlatList
        data={paymentsData}
        renderItem={({ item }) => <PaymentItem item={item} />}
        keyExtractor={(item) => item.payment_id}
        showsVerticalScrollIndicator={false}
      />
      </ImageBackground>
    </View>
  );
};

// Styles for the Payments screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
    //backgroundColor: '#f5f5f5',
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
  //   backgroundColor: '#4CAF50'
  // },
  paymentItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 2,
    borderColor: '#C49350',
    borderRadius: 8,
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
    color: status === 'Completed' ? 'green' : status === 'Pending' ? 'orange' : 'red',
    fontWeight: 'bold',
  }),
});

export default PaymentsScreen;