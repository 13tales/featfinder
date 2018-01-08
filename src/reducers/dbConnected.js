import { CONNECT_DB } from '../actions/actions.js';

export function dbConnected(state = { connected: false, driver: null, session: null}, action) {
    if (action.type === CONNECT_DB ) {
        return { connected: true, driver: action.driver, session: action.session };
    }

    return state;
}
