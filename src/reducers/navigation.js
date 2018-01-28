import _ from "lodash/fp";
import { ADD_HISTORY, DROP_HISTORY_AFTER } from "../actions/actions.js";

export function history(state = [], action) {
  switch (action.type) {
    case "@@router/LOCATION_CHANGE":
      const featKey = _.last(action.payload.pathname.split("/"));

      if (action.payload.state === undefined) {
        return [featKey];
      } else if (action.payload.state.historyIdx !== undefined) {
        const locationIdx = action.payload.state.historyIdx;

        return locationIdx < state.length
          ? [...state.slice(0, locationIdx), featKey]
          : [...state, featKey];
      } else return [];
    default:
      return state;
  }
}
