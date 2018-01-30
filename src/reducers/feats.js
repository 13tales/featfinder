import {
  INPUT_TEXT,
  SELECT_FEAT,
  SUCCESSOR_FEATS,
  FETCH_FEATS,
  BOOKMARK_FEAT,
  REMOVE_BOOKMARK
} from "../actions/actions.js";
import { Map } from "immutable";
import { removeSpecialChars } from "../utils/string.js";
import { OrderedSet } from "immutable";

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

export function successorFeats(state = [], action) {
  switch (action.type) {
    case SUCCESSOR_FEATS:
      return action.successors;
    case "@@router/LOCATION_CHANGE":
      return [];
    default:
      return state;
  }
}

export function bookmarks(state = OrderedSet(), action) {
  switch (action.type) {
    case BOOKMARK_FEAT:
      return state.add(action.featKey);
    case REMOVE_BOOKMARK:
      return state.delete(action.featKey);
    default:
      return state;
  }
}
