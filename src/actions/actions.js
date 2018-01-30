import * as neo4j from "neo4j-driver/lib/browser/neo4j-web.min.js";
import * as api from "../api/api.js";
import { push } from "react-router-redux";

export const INPUT_TEXT = "INPUT_TEXT";
export const CONNECT_DB = "CONNECT_DB";
export const PENDING = "PENDING";
export const INIT_DB = "INIT_DB";
export const SELECT_FEAT = "SELECT_FEAT";
export const SUCCESSOR_FEATS = "SUCCESSOR_FEATS ";
export const FETCH_FEATS = "FETCH_FEATS ";
export const SEARCH_OPTIONS = "SEARCH_OPTIONS ";
export const SUCCESSORS_DIRTY = "SUCCESSORS_DIRTY";
export const SIDEBAR = "SIDEBAR";
export const BOOKMARK_FEAT = "BOOKMARK_FEAT";
export const REMOVE_BOOKMARK = "REMOVE_BOOKMARK";

export function pending(dataElement) {
  return {
    type: PENDING,
    ...dataElement
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
    dispatch(pending({ db: true }));

    try {
      let driver = neo4j.v1.driver("bolt://localhost", {
        scheme: "basic",
        principal: "neo4j",
        credentials: "neo"
      });
      let session = driver.session();
      dispatch({
        type: CONNECT_DB,
        driver,
        session
      });
      dispatch(pending({ db: false }));
    } catch (e) {
      console.log(e);
    }
  };
}

export function getFeats() {
  return async (dispatch, getState) => {
    dispatch(pending({ feats: true }));

    const db = getState().dbConnected.session;

    let results = await api.fetchAll(db);

    dispatch({ type: FETCH_FEATS, results });

    return dispatch(pending({ feats: false }));
  };
}

export function inputText(content) {
  return { type: INPUT_TEXT, content };
}

export function selectFeat({ key, name }) {
  return (dispatch, getState) => {
    dispatch(push({ pathname: `/feat/${key}`, state: { historyIdx: 0 } }));
  };
}

export function getSuccessorFeats(featId) {
  return async (dispatch, getState) => {
    dispatch(pending({ featSuccessors: true }));

    const db = getState().dbConnected.session;

    console.log("Trying to get successors for:", featId);
    const results = await api.getSuccessors(db, featId);

    dispatch({
      type: SUCCESSOR_FEATS,
      successors: results.records.map(r => r.toObject().name)
    });

    return dispatch(pending({ featSuccessors: false }));
  };
}

export function gotoConnectedFeat(current, next) {
  return (dispatch, getState) => {
    const historyIdx = getState().history.length;
    dispatch(push({ pathname: `/feat/${next}`, state: { historyIdx } }));
  };
}

export function historyBack(idx, featKey) {
  return (dispatch, getState) => {
    dispatch(
      push({ pathname: `/feat/${featKey}`, state: { historyIdx: idx } })
    );
  };
}

export function addBookmark(featKey) {
  return { type: BOOKMARK_FEAT, featKey };
}

export function removeBookmark(featKey) {
  return { type: REMOVE_BOOKMARK, featKey };
}
