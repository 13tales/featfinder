import { combineReducers } from "redux";
import {
  search,
  successorFeats,
  featCache,
  bookmarks,
  searchOption,
  searchSubset,
  searchResults
} from "./feats.js";
import { actionPending } from "./async.js";
import { dbConnected } from "./dbConnected.js";
import { uiState } from "./ui.js";
import { routerReducer } from "react-router-redux";
import { history } from "./navigation.js";

const reducer = combineReducers({
  actionPending,
  dbConnected,
  successorFeats,
  featCache,
  uiState,
  router: routerReducer,
  history,
  bookmarks,
  searchOption,
  searchSubset,
  searchResults
});

export default reducer;
