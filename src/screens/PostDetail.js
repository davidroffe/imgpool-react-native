import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { API_URL } from '@env';

export const PostDetail = (props) => {
  const aspectRatio =
    props.route.params.post.height / props.route.params.post.width > 1
      ? props.route.params.post.height / props.route.params.post.width
      : props.route.params.post.width / props.route.params.post.height;

  return (
    <View>
      <Image
        style={{ ...styles.thumbnail, aspectRatio }}
        source={{ uri: `${API_URL}${props.route.params.post.url}` }}
      />
    </View>
  );
};

export default connect(null, actions)(PostDetail);

const styles = StyleSheet.create({
  thumbnail: {
    width: '100%',
  },
});
