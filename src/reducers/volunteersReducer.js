const volunteersReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_VOLUNTEERS":
      return action.payload;

    default:
      return state;
  }
};

export default volunteersReducer;
