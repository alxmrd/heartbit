export const INSERT_EVENT = "INSERT_EVENT";
export const EVENT_CORRESPODENCE = "EVENT_CORRESPODENCE";
export const FETCH_EVENTS = "FETCH_EVENTS";
const eventReducer = (state = [], action) => {
  switch (action.type) {
    case INSERT_EVENT:
      return [...state, action.payload];

    case FETCH_EVENTS:
      return action.payload;
    case EVENT_CORRESPODENCE:
      return state.map((events, index) => {
        if (events.id !== action.payload.id) {
          return events;
        }

        return {
          ...events,
          ...action.payload
        };
      });
    default:
      return state;
  }
};

export default eventReducer;
