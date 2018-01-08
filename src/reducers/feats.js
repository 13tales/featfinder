import {
  INPUT_TEXT,
  SELECT_FEAT,
  SUCCESSOR_FEATS
} from "../actions/actions.js";

export function search(state = { input: "", results: [] }, action) {
  if (action.type === INPUT_TEXT) {
    return {
      input: action.content,
      results: action.results.records.map(r => r.toObject().f.properties)
    };
  }

  return state;
}

export function selected(
  state = {
    name: "none selected",
    description: "n/a",
    benefit: "n/a",
    successors: []
  },
  action
) {
  switch (action.type) {
    case SELECT_FEAT:
      return { ...action.feat, successors: [] };
    case SUCCESSOR_FEATS:
      return { ...state, successors: action.successors };
    default:
      return state;
  }
}
