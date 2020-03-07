import {
  BUTTON_LOADING,
  USER_INFO,
  RESTORE_TOKEN,
  CONFIRM_PHONE,
  SIGN_IN,
  SIGN_OUT,
} from './constants';

export const initialState = {
  isLoading: true,
  buttonLoading: false,
  userToken: null,
  phone: null,
  userInfo: {
    name: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
  },
};

export default (state, action) => {
  switch (action.type) {
    case BUTTON_LOADING:
      return {
        ...state,
        buttonLoading: action.loading,
      };
    case CONFIRM_PHONE:
      return {
        ...state,
        phone: action.phone,
      };
    case USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
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
      };
    case SIGN_OUT:
      return {
        ...state,
        userToken: null,
        buttonLoading: false,
        phone: null,
        userInfo: {
          name: '',
          email: '',
          phoneNumber: '',
          photoURL: '',
        },
      };
  }
};
