const idkeeperReducer = (state = [], action) => {
  switch (action.type) {
    case "EDIT":
      return action.payload;

    default:
      return state;
  }
};

export default idkeeperReducer;
