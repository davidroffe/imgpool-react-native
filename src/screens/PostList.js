import React, { useEffect } from 'react';
import { Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { API_URL } from '@env';

export const PostList = (props) => {
  useEffect(() => {
    retrievePosts();
  }, []);
  function retrievePosts() {
    props.fetchPosts();
  }
  return (
    <FlatList
      data={props.posts.list}
      numColumns={2}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.thumbnailWrapper}
          onPress={() => {
            props.navigation.navigate('PostDetail', { post: item });
          }}
        >
          <Image
            style={styles.thumbnail}
            source={{ uri: `${API_URL}${item.thumbUrl}` }}
          />
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.thumbUrl}
    />
  );
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps, actions)(PostList);

const styles = StyleSheet.create({
  thumbnailWrapper: {
    flex: 1,
  },
  thumbnail: {
    aspectRatio: 1,
    width: '100%',
  },
});
