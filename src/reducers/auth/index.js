export const initialState = {
  isLoading: true,
  buttonLoading: false,
  userToken: null,
  userInfo: {
    name: '',
    email: '',
  },
};

export default (state, action) => {
  switch (action.type) {
    case 'BUTTON_LOADING':
      return {
        ...state,
        buttonLoading: action.loading,
      };
    case 'USER_INFO':
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
        buttonLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isLoading: false,
        userToken: action.token,
        userInfo: action.userInfo,
        buttonLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        userToken: null,
        buttonLoading: false,
      };
  }
};
