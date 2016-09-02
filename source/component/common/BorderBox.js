/**
 * @since 2016-09-02 16:29
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';

export default class BorderBox extends Component {

    static propTypes = {

    };

    render () {

        const {
            children,
        } = this.props;

        const style = {
            position: 'relative',
        };

        return <div style={style}>
            {children}
        </div>
    }

}
