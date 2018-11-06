const volunteersReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_VOLUNTEERS":
      return action.payload;
    case "NEW_VOLUNTEER":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default volunteersReducer;
