import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import idkeeperReducer from "./idkeeperReducer";
import VolunteerActivityReducer from "./volunteerActivityReducer";

export default combineReducers({
  volunteers: volunteersReducer,
  id: idkeeperReducer,
  status: VolunteerActivityReducer
});
