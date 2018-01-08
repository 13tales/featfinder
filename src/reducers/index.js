import { combineReducers } from 'redux';
import { search, selected } from './feats.js';
import { actionPending } from './async.js';
import { dbConnected } from './dbConnected.js';

const reducer = combineReducers({ actionPending, search, dbConnected, selected });

export default reducer;
