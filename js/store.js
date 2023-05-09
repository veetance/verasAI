const initialState = {
  currentPage: "home",
  loginVisible: false,
  loginContent: null,
  newsfeedVisible: false,
  newsfeedContent: null,
  insightsVisible: false,
  insightsContent: null,
  createVisible: false,
  createContent: null,
  onboardingVisible: false, // New property for onboarding visibility
  onboardingPage: 1,
  onboardingSteps: {
    1: "CreateAccount",
    2: "BriefExplain",
    3: "HowITWorks1",
    4: "HowITWorks2",
    5: "HowITWorks3",
    6: "Rules",
    7: "GetStarted",
  },
};

// Action types
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const HIDE_HOME = "HIDE_HOME";
const SHOW_LOGIN = "SHOW_LOGIN";
const HIDE_LOGIN = "HIDE_LOGIN";
const SET_LOGIN_CONTENT = "SET_LOGIN_CONTENT";
const SHOW_NEWSFEED = "SHOW_NEWSFEED";
const HIDE_NEWSFEED = "HIDE_NEWSFEED";
const SET_NEWSFEED_CONTENT = "SET_NEWSFEED_CONTENT";
const SHOW_INSIGHTS = "SHOW_INSIGHTS";
const HIDE_INSIGHTS = "HIDE_INSIGHTS";
const SET_INSIGHTS_CONTENT = "SET_INSIGHTS_CONTENT";
const SHOW_CREATE = "SHOW_CREATE";
const HIDE_CREATE = "HIDE_CREATE";
const SET_CREATE_CONTENT = "SET_CREATE_CONTENT";
const SET_ONBOARDING_CONTENT = "SET_ONBOARDING_CONTENT";// New action type for set onboarding
const SHOW_ONBOARDING = "SHOW_ONBOARDING"; // New action type for showing onboarding
const HIDE_ONBOARDING = "HIDE_ONBOARDING"; // New action type for hiding onboarding
const SET_ONBOARDING_PAGE = "SET_ONBOARDING_PAGE";

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case HIDE_HOME:
        return { ...state, currentPage: "none" };
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
    case SET_ONBOARDING_CONTENT:
      return {...state,onboardingContent: action.payload,};
    case SHOW_ONBOARDING:
      return { ...state, onboardingVisible: true }; // New case for showing onboarding
    case HIDE_ONBOARDING:
      return { ...state, onboardingVisible: false }; // New case for hiding onboarding
    case SET_ONBOARDING_PAGE:
      return { ...state, onboardingPage: action.payload };
    default:
      return state;
  }
}

function hideHome() {
  return { type: HIDE_HOME };
}

const store = Redux.createStore(reducer);


// write a store for settings page 



