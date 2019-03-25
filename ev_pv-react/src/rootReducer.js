import { combineReducers } from "redux";
import user from "./reducers/userReducer";
import procese from "./reducers/proceseReducer";
import controlori from "./reducers/controloriReducer";

export default combineReducers({
  user,
  procese,
  controlori
})
;