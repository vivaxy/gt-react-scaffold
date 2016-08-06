/**
 * @since 2016-06-05 09:45
 * @author vivaxy
 */

import 'whatwg-fetch';
import url from 'url';
import querystring from 'querystring';

import env from './env';
import {FetchError} from '../error';
import wrappedSetTimeout from './setTimeout';

const MOCK_TIMEOUT = 1000;
const API_ROOT = '/api';
const MOCK_API_ROOT = '/mock-server';
const SUCCESS_CODE_LOWER_BOUND = 200;
const SUCCESS_CODE_HIGHER_BOUND = 300;

let wrappedFetch = async (config) => {
    let {method = 'GET', data, url: requestPath} = config;
    let REQUEST_PATH;
    switch (env) {
        case 'dev':
            requestPath = `${MOCK_API_ROOT}${requestPath}.json`;
            break;
        default:
            break;
    }
    method = method.toUpperCase();
    let response;
    switch (method) {
        case 'GET':
            requestPath = url.format({
                pathname: requestPath,
                query: querystring.stringify(data)
            });
            response = await fetch(requestPath, {
                credentials: 'same-origin'
            });
            break;
        case 'POST':
            response = await fetch(requestPath, {
                method,
                body: JSON.stringify(data),
                credentials: 'same-origin'
            });
            break;
        default:
            break;
    }

    await wrappedSetTimeout(MOCK_TIMEOUT);

    switch (true) {
        case response.status >= SUCCESS_CODE_LOWER_BOUND && response.status < SUCCESS_CODE_HIGHER_BOUND:
            return response;
        default:
            throw new FetchError(response);
    }
};

export default wrappedFetch;
