/**
 * @since 2016-06-05 11:40
 * @author vivaxy
 */

class FetchError extends Error {
    constructor (response) {
        super(response.statusText);
        this.response = response;
        this.name = 'FetchError';
    }
}

FetchError.create = (response) => {
    return new FetchError(response);
};

export default FetchError;
