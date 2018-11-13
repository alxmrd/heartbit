const volunteersReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_VOLUNTEERS":
      return action.payload;
    case "NEW_VOLUNTEER":
      return [...state, action.payload];
    case "EDIT_VOLUNTEER":
      return [action.payload];

    case "UPDATE":
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
