// Screens/SellsScreen/SellsScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SellsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Sells Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SellsScreen;