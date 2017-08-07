import * as persistActionTypes from '../../actionTypes/persist';

export const initialState = {
    isHydrated: false,
};


export function persistReducer(state = initialState, action) {
    switch (action.type) {
        case persistActionTypes.UPDATE:
            return action.payload;
        default:
            return state;
    }
}