export const INSERT_EVENT = "INSERT_EVENT";

const newSuccessEventReducer = (state = [], action) => {
  switch (action.type) {
    case INSERT_EVENT:
      return action.payload;

    default:
      return state;
  }
};

export default newSuccessEventReducer;
