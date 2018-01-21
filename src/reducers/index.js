import { combineReducers } from "redux";
import { search, successorFeats, feats } from "./feats.js";
import { actionPending } from "./async.js";
import { dbConnected } from "./dbConnected.js";
import { uiState } from "./ui.js";
import { routerReducer } from "react-router-redux";

const reducer = combineReducers({
  actionPending,
  search,
  dbConnected,
  successorFeats,
  feats,
  uiState,
  router: routerReducer
});

export default reducer;
