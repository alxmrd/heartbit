import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import idkeeperReducer from "./idkeeperReducer";
import selectedPlaceReducer from "./selectedPlaceReducer";
import defibrillatorsReducer from "./defibrillatorsReducer";
import patientReducer from "./patientReducer";
import adminReducer from "./adminReducer";
import eventReducer from "./eventReducer";

export default combineReducers({
  volunteers: volunteersReducer,
  id: idkeeperReducer,
  selectedPlace: selectedPlaceReducer,
  event: eventReducer,
  defibrillators: defibrillatorsReducer,
  patients: patientReducer,
  admin: adminReducer
});
