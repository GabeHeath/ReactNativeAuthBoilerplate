import fetchival from 'fetchival';
import _ from 'lodash';

import { getSession } from '../helpers/session';
import apiConfig from './config';

export const exceptionExtractError = (errors) => {
    if (typeof errors === 'undefined' || errors.length === 0) return false;
    return errors[0];
};

export const fetchApi = (endPoint, payload = {}, method = 'get', headers = {}) => {
    const accessToken = getSession().tokens.access.value;
    return fetch(`${apiConfig.url}${endPoint}`, {
        method: method,
        headers: _.pickBy({
            ...(accessToken ? {
                Authorization: `Bearer ${accessToken}`,
            } : {
                'Client-ID': apiConfig.clientId,
            }),
            'Accept': `version=${apiConfig.apiVersion}`,
            'Content-Type': 'application/json',
            ...headers
        }, item => !_.isEmpty(item)),
        body: JSON.stringify(
            payload
        )
    })
    .then(response =>
        response.json().then(json => ({
            status: response.status,
            ok: response.ok,
            data: json
        })
    ))
    .catch((e) => {
        if (e.response && e.response.json) {
            e.response.json().then((json) => {
                if (json) throw json;
                throw e;
            });
        } else {
            throw e;
        }
    });
};