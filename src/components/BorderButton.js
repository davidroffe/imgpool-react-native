import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

const BorderButton = ({ text, onPress, shade }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={'white'}
      onPress={onPress}
    >
      <View style={shade === 'dark' ? styles.darkButton : styles.lightButton}>
        <Text style={shade === 'dark' ? styles.darkText : styles.lightText}>
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  darkButton: {
    height: 50,
    width: 326,
    maxWidth: '100%',
    borderColor: '#333',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightButton: {
    height: 50,
    width: 326,
    maxWidth: '100%',
    borderColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkText: {
    fontWeight: '800',
    fontSize: 12,
    color: '#333',
  },
  lightText: {
    fontWeight: '800',
    fontSize: 12,
    color: '#fffef2',
  },
});

export default BorderButton;
