/**
 * @since 2017-04-10 10:42:13
 * @author vivaxy
 */

import * as errorType from '../config/errors';
import { showToast } from '../redux/toast';

export default (ex) => {
    switch (ex.name) {
        case errorType.FETCH:
            showToast(ex.message);
            break;
        case errorType.SERVER:
            showToast(ex.message);
            break;
        default:
            throw ex;
    }
};
