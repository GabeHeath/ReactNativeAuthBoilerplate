import * as actionTypes from '../actionTypes/session';

export const update = session => ({
    type: actionTypes.UPDATE,
    session,
});