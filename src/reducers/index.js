import { combineReducers } from "redux";
import { search, successorFeats, feats, bookmarks } from "./feats.js";
import { actionPending } from "./async.js";
import { dbConnected } from "./dbConnected.js";
import { uiState } from "./ui.js";
import { routerReducer } from "react-router-redux";
import { history } from "./navigation.js";

const reducer = combineReducers({
  actionPending,
  search,
  dbConnected,
  successorFeats,
  feats,
  uiState,
  router: routerReducer,
  history,
  bookmarks
});

export default reducer;
