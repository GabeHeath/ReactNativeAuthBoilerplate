import * as actionTypes from '../actionTypes/persist';

export const update = payload => ({
    type: actionTypes.UPDATE,
    payload,
});