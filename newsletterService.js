import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';
import debug from 'sabio-debug';

const _logger = debug.extend('newsletterService');

const newsletterService = {
    endpoint: `${API_HOST_PREFIX}/api/newsletters`,
};


const getPaginatedNewsletters = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${newsletterService.endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const addNewsletters = (payload) => {
    _logger('add newsletters is firing', payload);
    const config = {
        method: 'POST',
        url: newsletterService.endpoint,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

const updateNewsletters = (id, payload) => {
    _logger('update is firing');
    const config = {
        method: 'PUT',
        url: newsletterService.endpoint + '/' + id,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const deleteNewsletters = (id) => {
    const config = {
        method: 'DELETE',
        url: newsletterService.endpoint + '/' + id,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(() => {
        return id;
    });
};

export {getPaginatedNewsletters, addNewsletters, updateNewsletters, deleteNewsletters}