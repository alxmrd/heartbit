import { STORE_ARDUINO_DATA } from "../actions/types";
import { ARDUINO_DATA_CLEANER } from "../actions/types";

const arduinoReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_ARDUINO_DATA:
      return action.payload;

    case ARDUINO_DATA_CLEANER:
      return {};

    default:
      return state;
  }
};

export default arduinoReducer;
