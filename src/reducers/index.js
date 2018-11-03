import { combineReducers } from "redux";
import postReducer from "./postReducer";
import volunteersReducer from "./volunteersReducer";

export default combineReducers({
  posts: postReducer,
  volunteers: volunteersReducer
});
