export const FETCH_ADMIN = "FETCH_ADMIN";
export const NEW_ADMIN = "NEW_ADMIN";

const adminReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ADMIN:
      return action.payload;

    case NEW_ADMIN:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default adminReducer;
