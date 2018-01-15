import { PENDING, INIT_DB } from "../actions/actions.js";

export function actionPending(state = false, action) {
  if (action.type === PENDING) {
    return action.active;
  }

  return state;
}

export function initDBdriver(state = null, action) {
  if (action.type === INIT_DB) {
  }
}
