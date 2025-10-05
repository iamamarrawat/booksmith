import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={style.screen}>
      <Image
        source={require('../../assets/images/onboarding_image.png')}
        style={style.image}
      />
      <Text style={{ fontSize: 34, fontFamily: 'WorkSans-Bold' }}>
        Keep reading,
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'WorkSans-Bold',
          paddingTop: 12,
          paddingBottom: 48,
        }}
      >
        You’ll fall in love
      </Text>
      <Text
        style={{
          fontSize: 13,
          fontFamily: 'WorkSans-Regular',
          textAlign: 'center',
        }}
      >
        A library of bite-sized business eBooks on soft skils and access to 30+
        millions books in various languages with an easy and simple monthly
        subscription and read anywhere, any devices.
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('homescreen');
        }}
      >
        <View style={style.iconButton}>
          <FontAwesome name="arrow-right" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    resizeMode: 'contain',
    height: 300,
    width: 300,
  },
  iconButton: {
    height: 40,
    width: 40,
    marginTop: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F07979',
  },
});
