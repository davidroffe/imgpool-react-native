import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import BorderButton from '../../components/BorderButton';

const EditField = (props) => {
  const handleChange = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>{props.route.params.field}</Text>
      <TextInput
        style={styles.textField}
        autoCompleteType={'off'}
        onChangeText={handleChange}
      />
      <BorderButton
        onPress={() => {
          /* logout */
        }}
        text="Submit"
        shade="dark"
      />
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
  mainHeader: {
    marginBottom: 35,
    fontSize: 50,
    fontWeight: '700',
  },
  textField: {
    fontWeight: '800',
    fontSize: 12,
    color: '#333',
    borderColor: '#333',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 35,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditField);
