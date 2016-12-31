/**
 * @since 2016-06-05 09:45
 * @author vivaxy
 */

import url from 'url';
import fetch from 'isomorphic-fetch';

import * as requestMethodConstant from '../config/requestMethod';
import getRequestPath from './requestPath';
import { FetchError, ServerError, TimeoutError } from '../errors';
import sleep from './sleep';
import environment from './environment';
import * as environmentType from '../config/environments';

const MOCK_DELAY = 1000;
const SUCCESS_CODE_LOWER_BOUND = 200;
const SUCCESS_CODE_HIGHER_BOUND = 300;

const basicFetchOptions = {
    credentials: 'include',
};

const sendRequest = async(config) => {

    let response = null;
    let {
        method = requestMethodConstant.GET,
        data,
        url: requestPath,
    } = config;

    requestPath = getRequestPath(requestPath);
    method = method.toUpperCase();

    switch (method) {
        case requestMethodConstant.GET:
            requestPath = url.format({
                pathname: requestPath,
                query: data
            });
            response = await fetch(requestPath, {
                ...basicFetchOptions
            });
            break;
        case requestMethodConstant.POST:
            response = await fetch(requestPath, {
                ...basicFetchOptions,
                method,
                body: JSON.stringify(data),
            });
            break;
        default:
            break;
    }

    if (environment === environmentType.DEVELOPMENT) {
        await sleep(MOCK_DELAY);
    }

    return response;
};

const timeoutPromise = async(timeout) => {
    await sleep(timeout);
    throw new TimeoutError(timeout);
};

export default async(config) => {

    const {
        timeout = 60000,
        ...fetchConfig,
    } = config;

    let response;

    response = await Promise.race([timeoutPromise(timeout), sendRequest(fetchConfig)]);

    if (response.status < SUCCESS_CODE_LOWER_BOUND || response.status >= SUCCESS_CODE_HIGHER_BOUND) {
        throw new FetchError(response);
    } else {
        const resp = await response.json();
        if (resp.code !== 0) {
            throw new ServerError(resp);
        } else {
            return resp.data;
        }
    }

};
