import { DEF_DATA_KEEPER } from "../actions/types";
import { DEF_DATA_CLEANER } from "../actions/types";

const defibrillatorDataReducer = (state = null, action) => {
  switch (action.type) {
    case DEF_DATA_KEEPER:
      return action.payload;

    case DEF_DATA_CLEANER:
      return null;

    default:
      return state;
  }
};

export default defibrillatorDataReducer;
