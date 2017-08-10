import store from '../store';
import * as api from '../api/session';
import * as sessionActions from '../actions/session';
import { initialState } from '../reducers/services/session';
import jwtDecode from 'jwt-decode';

const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

let sessionTimeout = null;

export const authenticate = (email, password) =>
    api.authenticate(email, password)
        .then(onRequestSuccess)
        .catch(onRequestFailed);

const clearSession = () => {
    clearTimeout(sessionTimeout);
    store.dispatch(sessionActions.update(initialState));
};

export const getSession = () => store.getState().services.session;

const onRequestFailed = (exception) => {
    clearSession();
    throw exception;
};

const onRequestSuccess = (response) => {
    if(response.ok && !response.data.hasOwnProperty('errors')) {
        const tokens = response.data.tokens;
        store.dispatch(sessionActions.update({ tokens }));
        const expire_in = jwtDecode(tokens.access).expire_in;
        setSessionTimeout(expire_in);
        return response; //Good response
    } else {
        clearSession();
        return response; //Bad response
    }
};

export const refreshToken = () => {
    const session = getSession();

    if (!session.tokens.refresh) {
        return Promise.reject();
    }

    return api.refresh(session.tokens.refresh)
        .then(onRequestSuccess)
        .catch(onRequestFailed);
};

const setSessionTimeout = (duration) => {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(
        refreshToken,
        (duration - SESSION_TIMEOUT_THRESHOLD) * 1000
    );
};