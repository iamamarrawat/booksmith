import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
      <Image
        source={require('../assets/images/onboarding_image.png')}
        style={styles.image}
      />
      <Text
        style={{ fontSize: 34, fontWeight: '600', fontFamily: 'work-sans' }}
      >
        Keep reading,
      </Text>
      <Text style={{ fontSize: 20, fontWeight: '600', fontFamily: 'lato' }}>
        You’ll fall in love
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    resizeMode: 'contain',
    height: 300,
    width: 300,
  },
});
