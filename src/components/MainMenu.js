import React from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import { HomeIcon, AccountIcon } from './icons';

const MainMenu = (props) => {
  let activeState = '';

  props.state.routes.map((route, index) => {
    if (props.state.index === index) {
      activeState = route.name;
    }
  });

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          props.navigation.navigate('PostList');
        }}
      >
        <HomeIcon active={activeState === 'PostList'} />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          props.navigation.navigate('Login');
        }}
      >
        <AccountIcon active={activeState === 'Login'} />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
    height: 70,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#333',
  },
});

export default MainMenu;
