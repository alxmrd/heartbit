import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import idkeeperReducer from "./idkeeperReducer";
import selectedPlaceReducer from "./selectedPlaceReducer";

import eventReducer from "./eventReducer";

export default combineReducers({
  volunteers: volunteersReducer,
  id: idkeeperReducer,
  selectedPlace: selectedPlaceReducer,
  event: eventReducer
});
