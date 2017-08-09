import * as sessionActionTypes from '../../actionTypes/session';

export const initialState = {
    tokens: {
        access: null,
        refresh: null
    }
};

export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case sessionActionTypes.UPDATE:
            return {
                ...action.session,
            };
        default:
            return state;
    }
};