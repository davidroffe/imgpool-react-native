import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

const BorderButton = ({ text, onPress }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={'white'}
      onPress={onPress}
    >
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 326,
    maxWidth: '100%',
    borderColor: '#fff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fffef2',
  },
});

export default BorderButton;
