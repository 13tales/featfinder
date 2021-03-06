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

export function selectFeat({ key, id }) {
  return dispatch => {
    dispatch(getSuccessorFeats(id));
    dispatch(push("/feat/" + key));
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
