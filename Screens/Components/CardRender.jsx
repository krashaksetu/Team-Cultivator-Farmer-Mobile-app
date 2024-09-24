import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import * as Animatable from 'react-native-animatable'

const renderCard = ({ item, navigation, styles }) => (
  <Animatable.View animation="zoomIn" duration={1000} style={styles.card}>
  <TouchableOpacity
    
    onPress={() => {
      switch (item.id) {
        case 1:
          navigation.navigate('Inventory');
          break;
        case 2:
          navigation.navigate('Orders History');
          break;
        case 3:
          navigation.navigate('PaymentsScreen');
          break;
       
        default:
          break;
      }
    }}
  >
    <Image source={item.image} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{item.title}</Text>
  </TouchableOpacity>
  </Animatable.View>
);

export default renderCard;