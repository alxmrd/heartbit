export const LOGGED_IN_ADMIN = "LOGGED_IN_ADMIN";
export const LOGGED_OUT_ADMIN = "LOGGED_OUT_ADMIN";

const loggedInAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN_ADMIN:
      return action.payload;

    case LOGGED_OUT_ADMIN:
      return {};

    default:
      return state;
  }
};

export default loggedInAdminReducer;
