export const initialState = {
  isLoading: true,
  userToken: null,
  userInfo: {
    name: '',
    email: '',
  },
};

export default (state, action) => {
  switch (action.type) {
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
      };
    case 'SIGN_IN':
      return {
        ...state,
        isLoading: false,
        userToken: action.token,
        userInfo: action.userInfo,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        userToken: null,
      };
  }
};
