const initialState = {
  currentPage: 'home',
  loginVisible: false,
  loginContent: null,
  newsfeedVisible: false,
  newsfeedContent: null,
};

// Action types
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SHOW_LOGIN = 'SHOW_LOGIN';
const HIDE_LOGIN = 'HIDE_LOGIN';
const SET_LOGIN_CONTENT = 'SET_LOGIN_CONTENT';
const SHOW_NEWSFEED = 'SHOW_NEWSFEED';
const HIDE_NEWSFEED = 'HIDE_NEWSFEED';
const SET_NEWSFEED_CONTENT = 'SET_NEWSFEED_CONTENT';


function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case SHOW_LOGIN:
      return { ...state, loginVisible: true };
    case HIDE_LOGIN:
      return { ...state, loginVisible: false };
    case SET_LOGIN_CONTENT:
      return { ...state, loginContent: action.payload };
    case SHOW_NEWSFEED:
      return { ...state, newsfeedVisible: true };
    case HIDE_NEWSFEED:
      return { ...state, newsfeedVisible: false };
    case SET_NEWSFEED_CONTENT:
      return { ...state, newsfeedContent: action.payload };
    case 'LOGOUT':
      return { ...state, newsfeedVisible: false, loginVisible: false, loginContent: null, newsfeedContent: null };
    default:
      return state;
  }
}

const store = Redux.createStore(reducer);