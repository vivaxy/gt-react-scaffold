/**
 * @since 2016-06-05 09:45
 * @author vivaxy
 */

import 'whatwg-fetch';
import url from 'url';

import * as requestMethodConstant from '../config/requestMethod';
import getRequestPath from './requestPath';
import { FetchError } from '../error';
import sleep from './sleep';

const MOCK_TIMEOUT = 1000;
const SUCCESS_CODE_LOWER_BOUND = 200;
const SUCCESS_CODE_HIGHER_BOUND = 300;

const basicFetchOptions = {
    credentials: 'same-origin',
};

export default async (config) => {

    let {
        method = requestMethodConstant.GET,
        data,
        url: requestPath,
    } = config;

    requestPath = getRequestPath(requestPath);
    method = method.toUpperCase();

    let response;

    switch (method) {
        case requestMethodConstant.GET:
            requestPath = url.format({
                pathname: requestPath,
                query: data
            });
            response = await fetch(requestPath, Object.assign({}, basicFetchOptions));
            break;
        case requestMethodConstant.POST:
            response = await fetch(requestPath, Object.assign({}, basicFetchOptions, {
                method,
                body: JSON.stringify(data),
            }));
            break;
        default:
            break;
    }

    await sleep(MOCK_TIMEOUT);

    switch (true) {
        case response.status >= SUCCESS_CODE_LOWER_BOUND && response.status < SUCCESS_CODE_HIGHER_BOUND:
            return response;
        default:
            throw new FetchError(response);
    }
};
