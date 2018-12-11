export const FETCH_PATIENTS = "FETCH_PATIENTS";

const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return action.payload;

    default:
      return state;
  }
};

export default eventsReducer;
