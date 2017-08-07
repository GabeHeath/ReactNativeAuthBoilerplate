import { combineReducers } from 'redux';
import { persistReducer } from '../reducers/services/persist';
import { sessionReducer } from '../reducers/services/session';

export const servicesReducer = combineReducers({
    session: sessionReducer,
    persist: persistReducer,
});