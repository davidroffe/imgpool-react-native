import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import BorderButton from '../components/BorderButton';
import { API_URL } from '@env';

export const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [form, setForm] = useState('login');

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
    let newErrorMessage = [];
    let url;

    switch (form) {
      case 'login':
        url = `${API_URL}/api/user/login`;
        break;
      case 'signUp':
        url = `${API_URL}/api/user/signup`;
        break;
      case 'forgotPassword':
        url = `${API_URL}/api/user/password-reset`;
        break;
    }

    if (user.email === undefined || user.email === '') {
      newErrorMessage.push('Please enter an email.');
    }
    if (form === 'login' || form === 'signUp') {
      if (user.password === undefined || user.password === '') {
        newErrorMessage.push('Please enter a password.');
      }
    }
    if (form === 'signUp') {
      if (user.password !== user.passwordConfirm) {
        newErrorMessage.push('Passwords do not match.');
      }
      if (user.password.length < 8) {
        newErrorMessage.push('Password must be at least 8 characters.');
      }
    }
    if (newErrorMessage.length > 0) {
      newErrorMessage.forEach((error) => {
        console.log(error);
        //toast.error(error);
      });
    } else {
      const urlSeachParams = new URLSearchParams({
        email: user.email,
        username: user.username,
        password: user.password,
        passwordConfirm: user.passwordConfirm,
      });
      fetch(`${url}?${urlSeachParams}`, {
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          if (form === 'forgotPassword') {
            //toast.success('An email has been sent.');
          } else {
            props.setUser('id', res.id);
            props.setUser('email', res.email);
            props.setUser('username', res.username);
            props.setUser('loggedIn', true);
            props.setUser('admin', res.admin);
            props.setUser('init', true);
            props.navigation.push('PostList');
          }
        })
        .catch((error) => {
          console.log('error ' + error);
          //toast.error(error);
        });
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

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
