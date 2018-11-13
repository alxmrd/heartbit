export const NEW_VOLUNTEER = "NEW_VOLUNTEER";
export const UPDATE_VOLUNTEERS = "UPDATE_VOLUNTEERS";
export const UPDATE_VOLUNTEER = "UPDATE_VOLUNTEER";

const volunteersReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_VOLUNTEERS:
      return action.payload;
    case NEW_VOLUNTEER:
      return [...state, action.payload];
    // case "EDIT_VOLUNTEER":
    //   return [action.payload];

    case UPDATE_VOLUNTEER:
      return state.map((volunteer, index) => {
        if (volunteer.id !== action.payload.id) {
          return volunteer;
        }

        return {
          ...volunteer,
          ...action.payload
        };
      });

    default:
      return state;
  }
};

export default volunteersReducer;
