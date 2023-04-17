const initialState = {
  currentPage: 'home',
  loginVisible: false,
  loginContent: null,
  newsfeedVisible: false,
  newsfeedContent: null,
  // Add new properties for insights and create pages
  insightsVisible: false,
  insightsContent: null,
  createVisible: false,
  createContent: null,
};

// Action types
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SHOW_LOGIN = 'SHOW_LOGIN';
const HIDE_LOGIN = 'HIDE_LOGIN';
const SET_LOGIN_CONTENT = 'SET_LOGIN_CONTENT';
const SHOW_NEWSFEED = 'SHOW_NEWSFEED';
const HIDE_NEWSFEED = 'HIDE_NEWSFEED';
const SET_NEWSFEED_CONTENT = 'SET_NEWSFEED_CONTENT';
// New action types for insights and create pages
const SHOW_INSIGHTS = 'SHOW_INSIGHTS';
const HIDE_INSIGHTS = 'HIDE_INSIGHTS';
const SET_INSIGHTS_CONTENT = 'SET_INSIGHTS_CONTENT';
const SHOW_CREATE = 'SHOW_CREATE';
const HIDE_CREATE = 'HIDE_CREATE';
const SET_CREATE_CONTENT = 'SET_CREATE_CONTENT';

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
    // New cases for insights and create pages
    case SHOW_INSIGHTS:
      return { ...state, insightsVisible: true };
    case HIDE_INSIGHTS:
      return { ...state, insightsVisible: false };
    case SET_INSIGHTS_CONTENT:
      return { ...state, insightsContent: action.payload };
    case SHOW_CREATE:
      return { ...state, createVisible: true };
    case HIDE_CREATE:
      return { ...state, createVisible: false };
    case SET_CREATE_CONTENT:
      return { ...state, createContent: action.payload };
    case 'LOGOUT':
      return { ...state, newsfeedVisible: false, loginVisible: false, loginContent: null, newsfeedContent: null };
    default:
      return state;
  }
}

const store = Redux.createStore(reducer);
