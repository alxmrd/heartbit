import { combineReducers } from "redux";
import volunteersReducer from "./volunteersReducer";
import idkeeperReducer from "./idkeeperReducer";
import selectedPlaceReducer from "./selectedPlaceReducer";
import defibrillatorsReducer from "./defibrillatorsReducer";
import patientReducer from "./patientReducer";
import adminReducer from "./adminReducer";
import eventReducer from "./eventReducer";
import httpStatusMessageReducer from "./httpStatusMessageReducer";
import volunteerSuccessReducer from "./volunteerSuccessReducer";
import newSuccessEventReducer from "./newSuccessEventReducer";
import successMessageReducer from "./successMessageReducer";
import defibrillatorDataReducer from "./defibrillatorDataReducer";
import defibrillatorSuccessReducer from "./defibrillatorSuccessReducer";

export default combineReducers({
  volunteers: volunteersReducer,
  id: idkeeperReducer,
  selectedPlace: selectedPlaceReducer,
  event: eventReducer,
  defibrillators: defibrillatorsReducer,
  patients: patientReducer,
  admin: adminReducer,
  error: httpStatusMessageReducer,
  volunteerSuccessData: volunteerSuccessReducer,
  defibrillatorSuccessData: defibrillatorSuccessReducer,
  eventSuccessData: newSuccessEventReducer,
  successMessage: successMessageReducer,
  defibrillatorData: defibrillatorDataReducer
});
