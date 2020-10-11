import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import * as actions from '../actions';
import BorderButton from '../components/BorderButton';
import { EditIcon } from '../components/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

  const logout = () => {};

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
      <BorderButton
        onPress={() => {
          /* logout */
        }}
        text="Log Out"
        shade="dark"
      />
      <Text style={styles.fieldHeader}>Username</Text>
      <View style={styles.row}>
        <Text style={styles.field}>{props.user.username}</Text>
        <TouchableOpacity
          onPress={() => {
            // setEditAccount({
            //   ...editAccount,
            //   show: true,
            //   field: 'edit-username',
            // })
          }}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.fieldHeader}>Email</Text>
      <View style={styles.row}>
        <Text style={styles.field}>{props.user.email}</Text>
        <TouchableOpacity
          onPress={() => {
            // setEditAccount({
            //   ...editAccount,
            //   show: true,
            //   field: 'edit-email',
            // })
          }}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.fieldHeader}>Password</Text>
      <View style={styles.row}>
        <Text style={styles.field}>hidden</Text>
        <TouchableOpacity
          onPress={() => {
            // setEditAccount({
            //   ...editAccount,
            //   show: true,
            //   field: 'edit-password',
            // })
          }}
        >
          <EditIcon />
        </TouchableOpacity>
      </View>
      <Text style={styles.fieldHeader}>Bio</Text>
      <View style={styles.row}>
        <Text style={styles.field}>{props.user.bio}</Text>
        <TouchableOpacity
          onPress={() => {
            // setEditAccount({
            //   ...editAccount,
            //   show: true,
            //   field: 'edit-bio',
            // })
          }}
        >
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
