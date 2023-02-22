const initialState = {
    currentPage: 'home',
    loginVisible: false,
    loginContent: null
  };
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_CURRENT_PAGE':
        return { ...state, currentPage: action.payload };
      case 'SHOW_LOGIN':
        return { ...state, loginVisible: true };
      case 'HIDE_LOGIN':
        return { ...state, loginVisible: false };
      case 'SET_LOGIN_CONTENT':
        return { ...state, loginContent: action.payload };
      default:
        return state;
    }
  }
  
  const store = Redux.createStore(reducer);