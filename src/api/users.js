import { fetchApi } from '../api/services';

const endPoints = {
    create: '/users',
    get: '/users',
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'get');