import { combineReducers } from "redux";
import { search, selected, feats } from "./feats.js";
import { actionPending } from "./async.js";
import { dbConnected } from "./dbConnected.js";
import { uiState } from "./ui.js";

const reducer = combineReducers({
  actionPending,
  search,
  dbConnected,
  selected,
  feats,
  uiState
});

export default reducer;
