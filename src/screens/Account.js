import React, { useEffect } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import * as actions from '../actions';

const Account = (props) => {
  useEffect(() => {
    async function fetchToken() {
      const auth = await SecureStore.getItemAsync('auth');
      const storedUser = jwtDecode(auth);
      if (auth !== null) {
        props.setUser('token', auth);
        props.setUser('id', storedUser.id);
        props.setUser('email', storedUser.email);
        props.setUser('username', storedUser.username);
        props.setUser('loggedIn', true);
        props.setUser('admin', storedUser.admin);
        props.setUser('init', true);
      } else {
        props.navigation.navigate('Login');
      }
    }

    fetchToken();
  }, []);
  return <View></View>;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Account);
