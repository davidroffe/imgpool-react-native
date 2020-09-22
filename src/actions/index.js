import { API_URL } from '@env';

export const clearPost = () => ({
  type: 'CLEAR_POST',
});

export function fetchPost(id) {
  return function (dispatch) {
    const url = '/api/post/single';
    const urlSearchParams = new URLSearchParams({
      id: id,
    });

    dispatch(clearPost());
    return fetch(`${url}?${urlSearchParams}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(setPost(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const fetchPosts = (
  { newSearchQuery, newPage } = {
    newSearchQuery: undefined,
    newPage: undefined,
  },
) => (dispatch, getState) => {
  const searchQuery =
    typeof newSearchQuery === 'string' ? newSearchQuery : getState().search;
  const url = searchQuery.length
    ? `${API_URL}/api/post/search`
    : `${API_URL}/api/post/list`;
  const urlSearchParams = new URLSearchParams({ searchQuery, page: 1 });

  dispatch(setPostsLoading(true));

  return fetch(`${url}?${urlSearchParams}`, {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res) => {
      const newPosts = res.list.length
        ? {
            list: res.list,
            totalCount: res.totalCount,
            loading: false,
          }
        : { list: [false], totalCount: 0, loading: false };

      dispatch(setSearch(searchQuery));
      dispatch(setPosts(newPosts));
    });
};

export const setPostsLoading = (state) => {
  return {
    type: 'SET_POSTS_LOADING',
    state,
  };
};

export const setPost = (post) => ({
  type: 'SET_POST',
  post: { ...post },
});

export const setPosts = (posts) => ({
  type: 'SET_POSTS',
  posts: { ...posts, init: true },
});

export const toggleTag = (tag) => ({
  type: 'TOGGLE_TAG',
  id: tag.id,
});

const setSearch = (text) => ({
  type: 'SET_SEARCH',
  text,
});

export const setUser = (field, value) => ({
  type: `SET_${field.toUpperCase()}`,
  value,
});
