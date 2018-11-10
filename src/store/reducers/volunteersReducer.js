const volunteersReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_VOLUNTEERS":
      return action.payload;
    case "NEW_VOLUNTEER":
      return state;
    case "EDIT_VOLUNTEER":
      return [action.payload];

    case "UPDATE":
      return [...state];
    default:
      return state;
  }
};

export default volunteersReducer;
