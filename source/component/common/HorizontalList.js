/**
 * @since 2016-09-02 14:43
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';

export default class HorizontalList extends Component {

    static propTypes = {};

    render () {

        const boxStyle = {
            display: '-webkit-box',
            display: '-webkit-flex',
            display: 'flex',
        };

        const {
            children,
            style,
            ...otherProps
        } = this.props;

        return <div {...otherProps} style={{
            ...boxStyle,
            ...style,
        }}>
            {children}
        </div>
    }
}
