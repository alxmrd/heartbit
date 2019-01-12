export const NEW_VOLUNTEER = "NEW_VOLUNTEER";

const CreateVolunteerSuccessReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_VOLUNTEER:
      return action.payload;

    default:
      return state;
  }
};

export default CreateVolunteerSuccessReducer;
