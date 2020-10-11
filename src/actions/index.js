import { API_URL } from '@env';
import { getCookies } from '../utils/cookies';
import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';

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

export const resetPassword = (user) => (dispatch) => {
  let newErrorMessage = [];
  const url = `${API_URL}/api/user/password-reset`;

  if (user.email === undefined || user.email === '') {
    newErrorMessage.push('Please enter an email.');
  }

  if (newErrorMessage.length > 0) {
    newErrorMessage.forEach((error) => {
      console.log(error);
      //toast.error(error);
    });
  } else {
    const urlSeachParams = new URLSearchParams({
      email: user.email,
    });
    fetch(`${url}?${urlSeachParams}`, {
      method: 'POST',
    })
      .then((res) => {
        //toast.success('An email has been sent.');
      })
      .catch((error) => {
        console.log('error ' + error);
        //toast.error(error);
      });
  }
};

export const signUp = (user, navigation) => (dispatch) => {
  let newErrorMessage = [];
  const url = `${API_URL}/api/user/signup`;

  if (user.email === undefined || user.email === '') {
    newErrorMessage.push('Please enter an email.');
  }
  if (user.password === undefined || user.password === '') {
    newErrorMessage.push('Please enter a password.');
  }
  if (user.password !== user.passwordConfirm) {
    newErrorMessage.push('Passwords do not match.');
  }
  if (user.password.length < 8) {
    newErrorMessage.push('Password must be at least 8 characters.');
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
    return fetch(`${url}?${urlSeachParams}`, {
      method: 'POST',
    })
      .then((res) => {
        const auth = getCookies(res).auth;
        if (auth) {
          const resUser = jwtDecode(auth);

          setUser('token', auth);
          setUser('id', resUser.id);
          setUser('email', resUser.email);
          setUser('username', resUser.username);
          setUser('loggedIn', true);
          setUser('admin', resUser.admin);
          setUser('init', true);

          SecureStore.setItemAsync('auth', auth);

          navigation.navigate('Account');
        }
        return res;
      })
      .catch((error) => {
        console.log('error ' + error);
      });
  }
};

export const login = (user, navigation) => (dispatch) => {
  let newErrorMessage = [];
  const url = `${API_URL}/api/user/login`;

  if (user.email === undefined || user.email === '') {
    newErrorMessage.push('Please enter an email.');
  }
  if (user.password === undefined || user.password === '') {
    newErrorMessage.push('Please enter a password.');
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
      .then((res) => {
        const auth = getCookies(res).auth;
        if (auth) {
          const resUser = jwtDecode(auth);

          setUser('token', auth);
          setUser('id', resUser.id);
          setUser('email', resUser.email);
          setUser('username', resUser.username);
          setUser('loggedIn', true);
          setUser('admin', resUser.admin);
          setUser('init', true);

          SecureStore.setItemAsync('auth', auth);

          navigation.navigate('Account');
        }
        return res;
      })
      .then((res) => res.json())
      .catch((error) => {
        console.log('error ' + error);
        //toast.error(error);
      });
  }
};

export const logout = (navigation) => (dispatch) => {
  SecureStore.deleteItemAsync('auth');
  dispatch(setUser('logout'));
  navigation.navigate('Login');
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
