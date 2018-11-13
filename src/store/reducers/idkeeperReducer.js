import { VOLUNTEER_DIALOG_OPEN } from "../actions/types";
import { VOLUNTEER_DIALOG_CLOSE } from "../actions/types";

const idkeeperReducer = (state = [], action) => {
  switch (action.type) {
    case VOLUNTEER_DIALOG_OPEN:
      return action.payload;
    case VOLUNTEER_DIALOG_CLOSE:
      return null;

    default:
      return state;
  }
};

export default idkeeperReducer;
