import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

const renderCard = ({ item, navigation, styles }) => (
  <TouchableOpacity
    style={styles.card}
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
);

export default renderCard;