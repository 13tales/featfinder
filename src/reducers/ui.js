import { SEARCH_OPTIONS } from "../actions/actions.js";

export function uiState(state = { showSearchOptions: false }, action) {
  return action.type === SEARCH_OPTIONS
    ? { showSearchOptions: !state.showSearchOptions }
    : state;
}
