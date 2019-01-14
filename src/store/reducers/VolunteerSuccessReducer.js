export const NEW_VOLUNTEER = "NEW_VOLUNTEER";
export const CLEAN_VOLUNTEER_DATA = "CLEAN_VOLUNTEER_DATA";
export const UPDATE_VOLUNTEER = "UPDATE_VOLUNTEER";

const VolunteerSuccessReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_VOLUNTEER:
      return action.payload;

    case UPDATE_VOLUNTEER:
      return action.payload;

    case CLEAN_VOLUNTEER_DATA:
      return {};

    default:
      return state;
  }
};

export default VolunteerSuccessReducer;
