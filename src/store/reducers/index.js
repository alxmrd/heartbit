import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import ikeeperReducer from "./idkeeperReducer";
import VolunteerActivityReducer from "./volunteerActivityReducer";

export default combineReducers({
  volunteers: volunteersReducer,
  id: ikeeperReducer,
  status: VolunteerActivityReducer
});
