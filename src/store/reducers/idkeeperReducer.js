import { DIALOG_OPEN } from "../actions/types";
import { DIALOG_CLOSE } from "../actions/types";

const idkeeperReducer = (state = null, action) => {
  switch (action.type) {
    case DIALOG_OPEN:
      return action.payload;

    case DIALOG_CLOSE:
      return null;

    default:
      return state;
  }
};

export default idkeeperReducer;
