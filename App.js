import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from './Screens/LoginScreen/LoginScreen.jsx';
import SignUpScreen from './Screens/SignUpScreen/SignUpScreen.jsx';
import HomeScreen from './Screens/MainScreens/HomeScreen.jsx';
import SellsScreen from './Screens/MainScreens/SellsScreen.jsx';
import ProfileScreen from './Screens/MainScreens/ProfileScreen.jsx';
import OrdersScreen from './Screens/SubScreens/OrdersScreen.jsx';
import PaymentsScreen from './Screens/SubScreens/PaymentsScreen.jsx';
import InventoryScreen from './Screens/SubScreens/InventoryListing.jsx';
import ProductForm from './Screens/Components/AddProduct.jsx';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define the Bottom Tab Navigator
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home" // Set initial tab as Home
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home'; // Home icon
          } else if (route.name === 'Sells') {
            iconName = 'cart'; // Sells icon
          } else if (route.name === 'Profile') {
            iconName = 'person'; // Profile icon
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
        tabBarStyle: { backgroundColor: '#58C472' }, // Tab bar background color
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Tab.Screen name="Sells" component={SellsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeStack" component={BottomTabNavigator} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="Orders History" component={OrdersScreen} />
        <Stack.Screen name="PaymentsScreen" component={PaymentsScreen} />
        <Stack.Screen name="ProductForm" component={ProductForm} options={{ title: 'Add Product' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
