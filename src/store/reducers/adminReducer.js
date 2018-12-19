export const FETCH_ADMIN = "FETCH_ADMIN";

const adminReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ADMIN:
      return action.payload;

    default:
      return state;
  }
};

export default adminReducer;
