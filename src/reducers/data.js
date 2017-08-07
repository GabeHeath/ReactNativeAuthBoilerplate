import { combineReducers } from 'redux';
import { usersReducer } from '../reducers/data/users';

export const dataReducer = combineReducers({
    users: usersReducer,
});