export const FETCH_PATIENTS = "FETCH_PATIENTS";
export const NEW_PATIENT = "NEW_PATIENT";
export const UPDATE_PATIENT = "UPDATE_PATIENT";

const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return action.payload;
    case NEW_PATIENT:
      return [...state, action.payload];
    case UPDATE_PATIENT:
      return state.map((patients, index) => {
        if (patients.id !== action.payload.id) {
          return patients;
        }

        return {
          ...patients,
          ...action.payload
        };
      });

    default:
      return state;
  }
};

export default eventsReducer;
