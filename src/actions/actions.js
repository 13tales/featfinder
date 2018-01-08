import * as neo4j from "neo4j-driver/lib/browser/neo4j-web.min.js";

export const INPUT_TEXT = "INPUT_TEXT";
export const CONNECT_DB = "CONNECT_DB";
export const PENDING = "PENDING";
export const INIT_DB = "INIT_DB";
export const SELECT_FEAT = "SELECT_FEAT ";

export function pending(active) {
  return {
    type: PENDING,
    active
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

export function inputText(content) {
  return async (dispatch, getState) => {
    dispatch(pending(true));

    let db = getState().dbConnected.session;

    let results = await db.run(
      `match (f :Feat) where f.name =~ $regex
       return f order by f.name asc limit 50`,
      { regex: `(?i).*${content}.*` }
    );

    dispatch(pending(false));

    return dispatch({ type: INPUT_TEXT, results, content });
  };
}

export function selectFeat(feat) {
  return { type: SELECT_FEAT, feat };
}
