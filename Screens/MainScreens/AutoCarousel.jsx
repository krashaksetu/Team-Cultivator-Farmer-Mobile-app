import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window'); // Get the width of the screen

const images = [
  { id: 1, src: require('./../../assets/images/landscape.png') },
  { id: 2, src: require('./../../assets/images/landscape2.png') },
  { id: 3, src: require('./../../assets/images/landscape3.png') },
];

const AutoCarousel = () => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToNext();
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [currentIndex]);

  const scrollToNext = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= images.length) {
      nextIndex = 0; // Loop back to the first image
    }
    scrollViewRef.current.scrollTo({
      x: nextIndex * width,
      animated: true,
    });
    setCurrentIndex(nextIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={false} // Disable manual scrolling to simulate automatic behavior
        showsHorizontalScrollIndicator={false}
      >
        {images.map((image) => (
          <Image key={image.id} source={image.src} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: 200, // Adjust height as needed
    resizeMode: 'cover',
  },
});

export default AutoCarousel;
