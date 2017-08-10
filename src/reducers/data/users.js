import * as userActionTypes from '../../actionTypes/users';

const initialState = {
    items: {},
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.UPDATE:
            return {
                items: {
                    ...state.items,
                    ...action.items.reduce((prev, curr) => ({
                        ...prev,
                        [curr.id]: curr,
                    }), {}),
                },
            };
        case userActionTypes.EMPTY:
            return {
                items: {},
            };
        default:
            return state;
    }
};