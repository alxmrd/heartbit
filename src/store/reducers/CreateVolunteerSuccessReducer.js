export const NEW_VOLUNTEER = "NEW_VOLUNTEER";
export const CLEAN_VOLUNTEER_DATA = "CLEAN_VOLUNTEER_DATA";

const CreateVolunteerSuccessReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_VOLUNTEER:
      return action.payload;

    case CLEAN_VOLUNTEER_DATA:
      return {};

    default:
      return state;
  }
};

export default CreateVolunteerSuccessReducer;
