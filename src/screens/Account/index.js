import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import * as actions from '../../actions';
import BorderButton from '../../components/BorderButton';
import { EditIcon } from '../../components/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Account = (props) => {
  useFocusEffect(() => {
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
      } else {
        props.navigation.navigate('Login');
      }
    }

    fetchToken();
  }, []);

  const editField = (field) => () => {
    props.navigation.navigate('EditField', { field });
  };

  const logout = () => {
    props.logout(props.navigation);
  };

  return (
    <View style={styles.container}>
      {/* <ToastContainer /> */}
      <Text style={styles.mainHeader}>Account</Text>
      <View style={{ marginBottom: 10 }}>
        <BorderButton
          onPress={() => {
            /* Show create post modal */
          }}
          text="Create Post"
          shade="dark"
        />
      </View>
      <BorderButton onPress={logout} text="Log Out" shade="dark" />
      <Text style={styles.fieldHeader}>Username</Text>
      <View style={styles.row}>
        <Text style={styles.field}>{props.user.username}</Text>
        <TouchableOpacity onPress={editField('Username')}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.fieldHeader}>Email</Text>
      <View style={styles.row}>
        <Text style={styles.field}>{props.user.email}</Text>
        <TouchableOpacity onPress={editField('Email')}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.fieldHeader}>Password</Text>
      <View style={styles.row}>
        <Text style={styles.field}>hidden</Text>
        <TouchableOpacity onPress={editField('Password')}>
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.fieldHeader}>Bio</Text>
      <View style={styles.row}>
        <Text style={styles.field}>{props.user.bio}</Text>
        <TouchableOpacity onPress={editField('Bio')}>
          <EditIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
    paddingHorizontal: 45,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainHeader: {
    marginBottom: 35,
    fontSize: 50,
    fontWeight: '700',
  },
  fieldHeader: {
    marginTop: 35,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  field: {
    fontWeight: '600',
    marginRight: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
