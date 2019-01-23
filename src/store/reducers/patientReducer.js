export const FETCH_PATIENTS = "FETCH_PATIENTS";
export const NEW_PATIENT = "NEW_PATIENT";

const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return action.payload;
    case NEW_PATIENT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default eventsReducer;
