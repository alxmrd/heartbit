const volunteersReducer = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_VOLUNTEERS":
      return action.payload;
    case "NEW_VOLUNTEER":
      return [...state, action.payload];
    case "EDIT_VOLUNTEER":
      return [action.payload];

    case "UPDATE":
      return state.map((volunteers, id) => {
        console.log(volunteers.id, "vol id");
        console.log(id, "id");
        console.log(action.payload.id, "action pay id");
        if (volunteers.id !== action.payload.id) {
          return volunteers;
        }

        return {
          ...volunteers,
          ...action.payload
        };
      });

    default:
      return state;
  }
};

export default volunteersReducer;
