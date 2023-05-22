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
  onboardingContent:null,

  onboardingStepsVisible: false, // New property for onboarding steps visibility
  onboardingStepsContent: null, // New property for onboarding steps content

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
const HIDE_ONBOARDING = "HIDE_ONBOARDING";

const SHOW_ONBOARDING_STEPS = "SHOW_ONBOARDING_STEPS";
const HIDE_ONBOARDING_STEPS = "HIDE_ONBOARDING_STEPS";
const SET_ONBOARDING_STEPS_CONTENT = "SET_ONBOARDING_STEPS_CONTENT";



//reducers
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
    case SHOW_ONBOARDING_STEPS:
      return { ...state, onboardingStepsVisible: true };
    case HIDE_ONBOARDING_STEPS:
      return { ...state, onboardingStepsVisible: false };
    case SET_ONBOARDING_STEPS_CONTENT:
      return {...state,onboardingStepsContent: action.payload,}; 
    default:
      return state;
  }
}




const store = Redux.createStore(reducer);


// write a store for settings page 



