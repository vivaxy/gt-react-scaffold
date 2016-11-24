/**
 * @since 2016-06-05 09:45
 * @author vivaxy
 */

import url from 'url';
import fetch from 'isomorphic-fetch';

import * as requestMethodConstant from '../config/requestMethod';
import getRequestPath from './requestPath';
import { FetchError, ServerError } from '../errors';
import sleep from './sleep';
import environment from './environment';
import * as environmentType from '../config/environments';

const MOCK_DELAY = 1000;
const SUCCESS_CODE_LOWER_BOUND = 200;
const SUCCESS_CODE_HIGHER_BOUND = 300;

const basicFetchOptions = {
    credentials: 'include',
};

const stringifyConfig = (config) => {
    return JSON.stringify(config);
};

const cached = {};

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
    return response;
};

export default async(config) => {

    const stringifiedConfig = stringifyConfig(config);
    let response;

    if (cached[stringifiedConfig]) {
        response = cached[stringifiedConfig].clone();
    } else {
        response = await sendRequest(config);
        cached[stringifiedConfig] = response.clone();
    }

    if (environment === environmentType.DEVELOPMENT) {
        await sleep(MOCK_DELAY);
    }

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
