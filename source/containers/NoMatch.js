/**
 * @since 2016-09-01 08:18
 * @author vivaxy
 */

import React, { Component } from 'react';

import connect from '../library/connect';

class NoMatch extends Component {

    render() {

        let {
            params,
            location,
        } = this.props;

        return <div>
            {JSON.stringify(params)}
            {JSON.stringify(location)}
        </div>
    }

}

export default connect(state => ({}), {
})(NoMatch);
