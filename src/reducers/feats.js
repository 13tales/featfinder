import {
  INPUT_TEXT,
  SELECT_FEAT,
  SUCCESSOR_FEATS,
  FETCH_FEATS
} from "../actions/actions.js";
import { Map } from "immutable";
import { removeSpecialChars } from "../utils/string.js";

export function search(state = "", action) {
  return action.type === INPUT_TEXT ? action.content : state;
}

export function feats(state = Map(), action) {
  console.log(action);
  return action.type === FETCH_FEATS
    ? action.results.records
        .map(r => r.toObject().f.properties)
        .reduce((out, f) => {
          let key = removeSpecialChars(f.name);
          return out.set(key, { ...f, key: key });
        }, Map())
    : state;
}

export function selected(
  state = {
    successors: []
  },
  action
) {
  return action.type === SUCCESSOR_FEATS
    ? { successors: action.successors }
    : state;
}
