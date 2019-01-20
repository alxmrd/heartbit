export const INSERT_EVENT = "INSERT_EVENT";
export const CLEAR_SUCCESS_MESSAGE = "CLEAR_SUCCESS_MESSAGE";

const newSuccessEventReducer = (state = null, action) => {
  switch (action.type) {
    case INSERT_EVENT:
      return action.payload.message;

    case CLEAR_SUCCESS_MESSAGE:
      return null;

    default:
      return state;
  }
};

export default newSuccessEventReducer;
