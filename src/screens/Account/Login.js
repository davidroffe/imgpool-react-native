import jwtDecode from 'jwt-decode';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SecureStore from 'expo-secure-store';
import * as actions from '../../actions';
import BorderButton from '../../components/BorderButton';

export const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [form, setForm] = useState('login');

  useFocusEffect(
    useCallback(() => {
      async function fetchToken() {
        const auth = await SecureStore.getItemAsync('auth');

        if (auth !== null) {
          const storedUser = jwtDecode(auth);
          props.setUser('token', auth);
          props.setUser('id', storedUser.id);
          props.setUser('email', storedUser.email);
          props.setUser('username', storedUser.username);
          props.setUser('loggedIn', true);
          props.setUser('admin', storedUser.admin);
          props.setUser('init', true);
          props.navigation.navigate('Account');
        }
      }

      fetchToken();
    }, []),
  );

  const handleChange = (id) => (e) => {
    const updatedUser = { ...user };

    updatedUser[id] = e;
    setUser(updatedUser);
  };

  const switchForm = (id = null) => (e) => {
    if (id === 'forgotPassword') {
      setForm('forgotPassword');
    } else {
      setForm(form === 'login' ? 'signUp' : 'login');
    }
  };

  const handleSubmit = () => {
    switch (form) {
      case 'login':
        props.login(user, props.navigation);
        break;
      case 'signUp':
        props.signUp(user, props.navigation);
        break;
      case 'forgotPassword':
        props.resetPassword(user);
    }
  };

  return (
    <View id="account-center" style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.textField}
          autoCompleteType={'off'}
          value={user.email}
          placeholder={'EMAIL'}
          placeholderTextColor={'#fffef2'}
          onChangeText={handleChange('email')}
        />
        {form === 'signUp' ? (
          <TextInput
            style={styles.textField}
            autoComplete={'off'}
            value={user.username}
            placeholder={'USERNAME'}
            placeholderTextColor={'#fffef2'}
            onChangeText={handleChange('username')}
          />
        ) : null}
        {form === 'signUp' || form === 'login' ? (
          <TextInput
            secureTextEntry={true}
            style={styles.textField}
            autoComplete={'off'}
            value={user.password}
            placeholder={'PASSWORD'}
            placeholderTextColor={'#fffef2'}
            onChangeText={handleChange('password')}
          />
        ) : null}
        {form === 'signUp' ? (
          <TextInput
            secureTextEntry={true}
            style={styles.textField}
            autoComplete={'off'}
            value={user.passwordConfirm}
            placeholder={'CONFIRM PASSWORD'}
            placeholderTextColor={'#fffef2'}
            onChangeText={handleChange('passwordConfirm')}
          />
        ) : null}
      </View>
      <BorderButton
        onPress={handleSubmit}
        text={(() => {
          switch (form) {
            case 'login':
              return 'LOGIN';
            case 'signUp':
              return 'SIGN UP';
            case 'forgotPassword':
              return 'SEND EMAIL';
          }
        })()}
      />
      <View style={{ ...styles.row, marginTop: 25 }}>
        <TouchableWithoutFeedback onPress={switchForm()}>
          <Text style={styles.text}>
            {form === 'login' ? 'Sign Up' : 'Login'}
          </Text>
        </TouchableWithoutFeedback>
        <Text style={styles.text}> | </Text>
        <TouchableWithoutFeedback onPress={switchForm('forgotPassword')}>
          <Text style={styles.text}>Forgot Password</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: 300,
    paddingBottom: 35,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textField: {
    fontWeight: '800',
    fontSize: 12,
    color: '#fffef2',
    borderColor: '#fffef2',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontSize: 12,
    color: '#fffef2',
  },
});
