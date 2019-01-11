export const ISINVALID = "ISINVALID";
export const CLEAR_ISINVALID = "CLEAR_ISINVALID";

const httpStatusMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case ISINVALID:
      return action.payload;

    case CLEAR_ISINVALID:
      return {};

    default:
      return state;
  }
};

export default httpStatusMessageReducer;
