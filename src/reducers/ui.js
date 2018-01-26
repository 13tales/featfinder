import { SEARCH_OPTIONS, SIDEBAR } from "../actions/actions.js";

export function uiState(
  state = { showSearchOptions: false, showSidebar: false },
  action
) {
  switch (action.type) {
    case SEARCH_OPTIONS:
      return { ...state, showSearchOptions: !state.showSearchOptions };
    case SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar };
    default:
      return state;
  }
}
