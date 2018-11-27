import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import idkeeperReducer from "./idkeeperReducer";

import eventReducer from "./eventReducer";

export default combineReducers({
  volunteers: volunteersReducer,
  id: idkeeperReducer,
  event: eventReducer
});
