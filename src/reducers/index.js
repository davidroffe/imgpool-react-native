import { combineReducers } from 'redux';
import post from './post';
import posts from './posts';
import search from './search';
import user from './user';

export default combineReducers({
  post,
  posts,
  search,
  user,
});
