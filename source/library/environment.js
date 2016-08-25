/**
 * @since 2016-06-11 15:43
 * @author vivaxy
 */

let env = 'production';

let host = location.host;

if (host === '127.0.0.1:8080') {
    env = 'dev';
}

export default env;
