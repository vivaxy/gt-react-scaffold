/**
 * @since 2016-09-01 08:18
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class NoMatch extends Component {

    static propTypes = {
        params: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    };

    render() {
        const {
            params,
            location,
        } = this.props;

        return (
            <div>
                {JSON.stringify(params)}
                {JSON.stringify(location)}
            </div>
        );
    }

}

export default connect(() => {
    return {};
}, {})(NoMatch);
