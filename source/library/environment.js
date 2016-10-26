/**
 * @since 2016-06-11 15:43
 * @author vivaxy
 */

import * as environmentConstant from '../config/environments';

export default process.env.NODE_ENV || environmentConstant.PRODUCTION;
