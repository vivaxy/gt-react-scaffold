/**
 * @since 2016-09-02 16:02
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';

export default class VerticalListItem extends Component {

    static propTypes = {
        flex: PropTypes.number,
        height: PropTypes.number,
    };

    render () {

        const {
            flex,
            height,
            children,
            style,
            ...otherProps
        } = this.props;

        let childStyle = {};

        if (flex !== undefined) {
            childStyle = {
                WebkitBoxFlex: flex,
                WebkitFlex: flex,
                flex: flex,
                ...style
            };
        } else {
            childStyle = {
                height,
                ...style
            };
        }

        return <div style={childStyle} {...otherProps}>
            {children}
        </div>
    }
}
