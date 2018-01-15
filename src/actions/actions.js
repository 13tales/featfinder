import * as neo4j from "neo4j-driver/lib/browser/neo4j-web.min.js";
import * as api from "../api/api.js";

export const INPUT_TEXT = "INPUT_TEXT";
export const CONNECT_DB = "CONNECT_DB";
export const PENDING = "PENDING";
export const INIT_DB = "INIT_DB";
export const SELECT_FEAT = "SELECT_FEAT ";
export const SUCCESSOR_FEATS = "SUCCESSOR_FEATS ";
export const FETCH_FEATS = "FETCH_FEATS ";
export const SEARCH_OPTIONS = "SEARCH_OPTIONS ";

export function pending(active) {
  return {
    type: PENDING,
    active
  };
}

export function initApp() {
  return dispatch => {
    dispatch(initDB());
    dispatch(getFeats());
  };
}

export function initDB() {
  return dispatch => {
    dispatch(pending(true));

    try {
      let driver = neo4j.v1.driver("bolt://localhost", {
        scheme: "basic",
        principal: "neo4j",
        credentials: "neo"
      });
      let session = driver.session();
      return dispatch({
        type: CONNECT_DB,
        driver,
        session
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getFeats() {
  return async (dispatch, getState) => {
    dispatch(pending(true));

    const db = getState().dbConnected.session;

    let results = await api.fetchAll(db);

    dispatch(pending(false));

    return dispatch({ type: FETCH_FEATS, results });
  };
}

export function inputText(content) {
  return { type: INPUT_TEXT, content };
}

export function getSuccessorFeats(featId) {
  return async (dispatch, getState) => {
    dispatch(pending(true));

    const db = getState().dbConnected.session;

    const results = await api.getSuccessors(db, featId);

    dispatch(pending(false));

    return dispatch({
      type: SUCCESSOR_FEATS,
      successors: results.records.map(r => r.toObject().name)
    });
  };
}

export function selectFeat(feat) {
  return dispatch => {
    dispatch({ type: SELECT_FEAT, feat });

    return dispatch(getSuccessorFeats(feat.id));
  };
}
