import {
  BUTTON_LOADING,
  USER_INFO,
  RESTORE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
} from './constants';

export const initialState = {
  isLoading: true,
  buttonLoading: false,
  userToken: null,
  emailVerified: false,
  userInfo: {
    name: '',
    email: '',
  },
};

export default (state, action) => {
  switch (action.type) {
    case BUTTON_LOADING:
      return {
        ...state,
        buttonLoading: action.loading,
      };
    case USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
        emailVerified: action.emailVerified,
        isLoading: false,
      };
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
      };
    case SIGN_IN:
      return {
        ...state,
        userToken: action.token,
        userInfo: action.userInfo,
        emailVerified: action.emailVerified,
      };
    case SIGN_OUT:
      return {
        ...state,
        userToken: null,
        buttonLoading: false,
      };
  }
};
