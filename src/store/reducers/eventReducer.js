export const INSERT_EVENT = "INSERT_EVENT";
export const FETCH_EVENTS = "FETCH_EVENTS";
const eventReducer = (state = [], action) => {
  switch (action.type) {
    case INSERT_EVENT:
      return [...state, action.payload];

    case FETCH_EVENTS:
      return action.payload;

    default:
      return state;
  }
};

export default eventReducer;
