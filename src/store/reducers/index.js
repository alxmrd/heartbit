import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import ikeeperReducer from "./idkeeperReducer";

export default combineReducers({
  volunteers: volunteersReducer,
  id: ikeeperReducer
});
