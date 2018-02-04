import { PENDING, INIT_DB } from "../actions/actions.js";

export function actionPending(
  state = {
    db: true,
    feats: true,
    featSuccessors: true,
    searchSubset: true,
    searchResults: false
  },
  { type, ...rest }
) {
  if (type === PENDING) {
    return { ...state, ...rest };
  }

  return state;
}

export function initDBdriver(state = null, action) {
  if (action.type === INIT_DB) {
  }
}
