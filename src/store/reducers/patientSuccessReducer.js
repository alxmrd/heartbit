export const NEW_PATIENT = "NEW_PATIENT";
export const CLEAN_PATIENT_DATA = "CLEAN_PATIENT_DATA";
export const UPDATE_PATIENT = "UPDATE_PATIENT";

const patientSuccessReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_PATIENT:
      return action.payload;
    case UPDATE_PATIENT:
      return action.payload;
    case CLEAN_PATIENT_DATA:
      return {};
    default:
      return state;
  }
};

export default patientSuccessReducer;
