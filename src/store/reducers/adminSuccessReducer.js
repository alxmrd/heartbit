export const NEW_ADMIN = "NEW_ADMIN";
export const CLEAN_ADMIN_DATA = "CLEAN_ADMIN_DATA";
export const UPDATE_ADMIN = "UPDATE_ADMIN";

const patientSuccessReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_ADMIN:
      return action.payload;
    case UPDATE_ADMIN:
      return action.payload;
    case CLEAN_ADMIN_DATA:
      return {};
    default:
      return state;
  }
};

export default patientSuccessReducer;
