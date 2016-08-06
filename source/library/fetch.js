/**
 * @since 2016-06-05 09:45
 * @author vivaxy
 */

import 'whatwg-fetch';
import url from 'url';
import querystring from 'querystring';

import env from './env';
import {FetchError} from '../error';

const API_ROOT = '/api';
const MOCK_API_ROOT = 'http://127.0.0.1:8081/api';
const SUCCESS_CODE_LOWER_BOUND = 200;
const SUCCESS_CODE_HIGHER_BOUND = 300;

let wrappedFetch = async (config) => { // eslint-disable-line arrow-parens
    let {method = 'GET', data} = config;
    let requestPath = config.url;
    let REQUEST_PATH;
    switch (env) {
        case 'dev':
            REQUEST_PATH = MOCK_API_ROOT;
            break;
        default:
            break;
    }
    requestPath = `${REQUEST_PATH}${requestPath}`;
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
    switch (true) {
        case response.status >= SUCCESS_CODE_LOWER_BOUND && response.status < SUCCESS_CODE_HIGHER_BOUND:
            return response;
        default:
            throw new FetchError(response);
    }
};

export default wrappedFetch;
