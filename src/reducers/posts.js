const initialState = {
  list: [],
  totalCount: 0,
  loading: false,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return action.posts;
    case 'SET_POSTS_LIST':
      return { ...state, list: action.posts };
    case 'SET_POSTS_LOADING':
      return { ...state, loading: action.state };
    default:
      return state;
  }
};

export default posts;
