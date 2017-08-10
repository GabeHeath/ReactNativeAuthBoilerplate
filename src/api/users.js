import { fetchApi } from '../api/services';

const endPoints = {
    create: '/users',
    update_email: '/users/email/update',
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const update_email = payload => fetchApi(endPoints.update_email, payload, 'patch');