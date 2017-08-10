import { Buffer } from 'buffer';
import { fetchApi } from '../api/services';

const endPoints = {
    authenticate: '/users/auth',
    revoke: '/users/auth/revoke',
    refresh: '/users/auth/refresh',
};

export const authenticate = (email, password) => fetchApi(endPoints.authenticate, {}, 'post', {
    Authorization: `Basic ${new Buffer(`${email}:${password}`).toString('base64')}`,
});

export const refresh = (token) => fetchApi(endPoints.refresh, { token: {refresh: token} }, 'post');

export const revoke = (token) => fetchApi(endPoints.revoke, { token: {refresh: token} }, 'post');