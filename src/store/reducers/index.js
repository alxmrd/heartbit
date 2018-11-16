import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import ikeeperReducer from "./idkeeperReducer";
// import setVolunteerActivity from "./volunteerActivityReducer";

export default combineReducers({
  volunteers: volunteersReducer,
  id: ikeeperReducer
  // status: setVolunteerActivity
});
