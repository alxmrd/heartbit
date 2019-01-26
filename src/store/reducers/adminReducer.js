export const FETCH_ADMIN = "FETCH_ADMIN";
export const NEW_ADMIN = "NEW_ADMIN";
export const UPDATE_ADMIN = "UPDATE_ADMIN";

const adminReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ADMIN:
      return action.payload;

    case NEW_ADMIN:
      return [...state, action.payload];

    case UPDATE_ADMIN:
      return state.map((admin, index) => {
        if (admin.id !== action.payload.id) {
          return admin;
        }

        return {
          ...admin,
          ...action.payload
        };
      });

    default:
      return state;
  }
};

export default adminReducer;
